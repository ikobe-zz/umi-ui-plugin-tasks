const getDemoData = async () => {
  return {
    name: 'demo',
  };
}

export default function(api) {
  api.onUISocket(({ action: { type, payload }, send, log }) => {
    switch (type) {
      case 'demo/fetch':
        (async () => {
          send({
            type: `${type}/success`,
            payload: await getDemoData(),
          });  
        })()
        break;
      default:
    }
  });
}
