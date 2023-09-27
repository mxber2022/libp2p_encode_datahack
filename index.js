import { multiaddr, protocols } from "@multiformats/multiaddr"
import { pipe } from "it-pipe"
import { fromString, toString } from "uint8arrays"
import { webRTC } from "@libp2p/webrtc"
import { webSockets } from "@libp2p/websockets"
import * as filters from "@libp2p/websockets/filters"
import { pushable } from "it-pushable"
import { mplex } from "@libp2p/mplex"
import { createLibp2p } from "libp2p"
import { circuitRelayTransport } from 'libp2p/circuit-relay'
import { noise } from "@chainsafe/libp2p-noise"
import { identifyService } from 'libp2p/identify'

const WEBRTC_CODE = protocols('webrtc').code

const output = document.getElementById("output")
const sendSection = document.getElementById("send-section")
const appendOutput = (line) => {
  const div = document.createElement("div")
  div.appendChild(document.createTextNode(line))
  output.append(div)
}
const clean = (line) => line.replaceAll("\n", "")
const sender = pushable()

const node = await createLibp2p({
  addresses: {
    listen: [
      '/webrtc'
    ]
  },
  transports: [
    webSockets({
      filter: filters.all,
    }),
    webRTC(),
    circuitRelayTransport({
      discoverRelays: 1,
    }),
  ],
  connectionEncryption: [noise()],
  streamMuxers: [mplex()],
  connectionGater: {
    denyDialMultiaddr: () => {
      return false
    }
  },
  services: {
    identify: identifyService()
  }
})

await node.start()

await node.handle("/echo/1.0.0", ({ stream }) => {
  pipe(
    stream,
    async function* (source) {


      for await (const buf of source) {

        const textDecoder = new TextDecoder('utf-8');
        const decodedString = textDecoder.decode(buf.subarray());
        console.log("decodedString: ",decodedString); 

        const myFile = new File([buf], 'test.jpeg', {
          type: source.type,
        });
      
      console.log("myFile", buf);

      

      try {
      const imageBlob = new Blob([myFile], { type: 'image/jpeg' });
      console.log("imageBlob ", source);
      const blobUrl = URL.createObjectURL(imageBlob);
      const imgElement = document.getElementById("imageContainer");
      imgElement.src = decodedString;
    } catch (error) {
      console.error("Error creating Blob URL:", error);
  }

        const incoming = toString(buf.subarray())
        appendOutput(`Received message '${clean(incoming)}'`)
        yield buf
      }
    },
    stream
  )
})

function updateConnList() {
  const connListEls = node.getConnections()
    .map((connection) => {
      if (connection.remoteAddr.protoCodes().includes(WEBRTC_CODE)) {
        sendSection.style.display = "block"
      }

      const el = document.createElement("li")
      el.textContent = connection.remoteAddr.toString()
      return el
    })
  document.getElementById("connections").replaceChildren(...connListEls)
}

node.addEventListener("connection:open", (event) => {
  updateConnList()
})
node.addEventListener("connection:close", (event) => {
  updateConnList()
})

node.addEventListener("self:peer:update", (event) => {
  const multiaddrs = node.getMultiaddrs()
    .map((ma) => {
      const el = document.createElement("li")
      el.textContent = ma.toString()
      return el
    })
  document.getElementById("multiaddrs").replaceChildren(...multiaddrs)
})

const isWebrtc = (ma) => {
  return ma.protoCodes().includes(WEBRTC_CODE)
}

window.connect.onclick = async () => {
  const ma = multiaddr(window.peer.value)
  appendOutput(`Dialing '${ma}'`)
  const connection = await node.dial(ma)

  if (isWebrtc(ma)) {
    const outgoing_stream = await connection.newStream(["/echo/1.0.0"])
    pipe(sender, outgoing_stream, async (src) => {
      for await (const buf of src) {
        const response = toString(buf.subarray())
        appendOutput(`Received message '${clean(response)}'`)
      }
    })
  }

  appendOutput(`Connected to '${ma}'`)
}

window.send.onclick = async () => {
  const fileInput = document.getElementById('fileInput');
  
  const file = fileInput.files[0];

  file.arrayBuffer().then((arrayBuffer) => {
    const blob = new Blob([new Uint8Array(arrayBuffer)], {type: file.type });
    console.log(blob);

    const imageBlob = new Blob([blob], { type: 'image/jpeg' });
     
      const blobUrl = URL.createObjectURL(imageBlob);
      console.log("x:", blobUrl);

    const message = blob
    sender.push(fromString(blobUrl))

  });

  
}