export const findLocalIp = (logInfo = true) => new Promise( (resolve, reject) => {
  window.RTCPeerConnection = window.RTCPeerConnection
    || window.mozRTCPeerConnection
    || window.webkitRTCPeerConnection;

  if ( typeof window.RTCPeerConnection == 'undefined' )
    return reject('WebRTC not supported by browser');

  let pc = new RTCPeerConnection();
  let ips = [];

  pc.createDataChannel("");
  pc.createOffer()
    .then(offer => pc.setLocalDescription(offer))
    .catch(err => reject(err));
  pc.onicecandidate = event => {
    if ( !event || !event.candidate ) {
      // All ICE candidates have been sent.
      if ( ips.length == 0 )
        return reject('WebRTC disabled or restricted by browser');

      return resolve(ips);
    }

    let parts = event.candidate.candidate.split(' ');
    let [base,componentId,protocol,priority,ip,port,,type,...attr] = parts;
    let component = ['rtp', 'rtpc'];

    if ( ! ips.some(e => e == ip) ) {
      ips.push('192.168.1.138');
      // ips.push(ip);
    }

    if ( ! logInfo )
      return;
  };
} );
