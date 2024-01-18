let Usuario
document.querySelector('form')
          .addEventListener('submit', e => {
              
              e.preventDefault()
              const data = Object.fromEntries(
              new FormData(e.target)
              )
              alert(JSON.stringify(data))
              Usuario = JSON?.stringify(data)
              Usuario = JSON.parse(Usuario)
              console.info(Usuario)
              Usuario.edad = parseInt(Usuario.edad)
              console.info(Usuario)
              fetch('https://rest-api-dev-zatj.1.us-1.fl0.io/', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(Usuario)
              })
              .then(res => {
                if (typeof res === 'object') {
                    return res.json()
                } else {
                    return res.text()
                }
              })
              .then(data => {
                  console.info(data)
              })
              .catch(error => console.log(error))
          })