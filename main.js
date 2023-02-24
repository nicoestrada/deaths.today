const request = require('request')
const cheerio = require('cheerio')
//const moment = require('moment')
const moment = require('moment-timezone')
const fs = require('fs')

const URL = 'https://en.wikipedia.org/wiki/Deaths_in_2023'
moment().tz('America/Chicago').format("MMMM DD, YYYY")
const yesterday = moment().subtract(1, 'day')
const currMonth = yesterday.format('MMMM')
const currDay = yesterday.format('D')
const dateLayout = yesterday.format('MMMM DD, YYYY')
const linkColor = '#2c3e50'

//html template
const template = (content, currentDate) => {
    return `
  <!doctype html>
  <html>
    <head>
        <meta name="viewport" content="width=device-width">
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Notable Deaths: ${dateLayout}</title>
    </head>
    <style>
    @media only screen and (max-width: 620px) {
      table[class=body] h1 {
        font-size: 28px !important;
        margin-bottom: 10px !important;
      }
      table[class=body] p,
            table[class=body] ul,
            table[class=body] ol,
            table[class=body] td,
            table[class=body] span,
            table[class=body] a {
        font-size: 16px !important;
      }
      table[class=body] .wrapper,
            table[class=body] .article {
        padding: 10px !important;
      }
      table[class=body] .content {
        padding: 0 !important;
      }
      table[class=body] .container {
        padding: 0 !important;
        width: 100% !important;
      }
      table[class=body] .main {
        border-left-width: 0 !important;
        border-radius: 0 !important;
        border-right-width: 0 !important;
      }
      table[class=body] .btn table {
        width: 100% !important;
      }
      table[class=body] .btn a {
        width: 100% !important;
      }
      table[class=body] .img-responsive {
        height: auto !important;
        max-width: 100% !important;
        width: auto !important;
      }
    }
    /* -------------------------------------
        PRESERVE THESE STYLES IN THE HEAD
    ------------------------------------- */
    @media all {
      .ExternalClass {
        width: 100%;
      }
      .ExternalClass,
            .ExternalClass p,
            .ExternalClass span,
            .ExternalClass font,
            .ExternalClass td,
            .ExternalClass div {
        line-height: 100%;
      }
      .apple-link a {
        color: inherit !important;
        font-family: inherit !important;
        font-size: inherit !important;
        font-weight: inherit !important;
        line-height: inherit !important;
        text-decoration: none !important;
      }
      #MessageViewBody a {
        color: inherit;
        text-decoration: none;
        font-size: inherit;
        font-family: inherit;
        font-weight: inherit;
        line-height: inherit;
      }
      .btn-primary table td:hover {
        background-color: #34495e !important;
      }
      .btn-primary a:hover {
        background-color: #34495e !important;
        border-color: #34495e !important;
      }
    }
    </style>
    <body class="" style="background-color: #f6f6f6; font-family: sans-serif; -webkit-font-smoothing: antialiased; font-size: 14px; line-height: 1.4; margin: 0; padding: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
    <table border="0" cellpadding="0" cellspacing="0" class="body" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; background-color: #f6f6f6;">
      <tr>
        <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">&nbsp;</td>
        <td class="container" style="font-family: sans-serif; font-size: 14px; vertical-align: top; display: block; Margin: 0 auto; max-width: 580px; padding: 10px; width: 580px;">
          <div class="content" style="box-sizing: border-box; display: block; Margin: 0 auto; max-width: 580px; padding: 10px;">
            <!-- START CENTERED WHITE CONTAINER -->
            <span class="preheader" style="color: transparent; display: none; height: 0; max-height: 0; max-width: 0; opacity: 0; overflow: hidden; mso-hide: all; visibility: hidden; width: 0;">
              Wikipedia's current events, delivered daily to your inbox.
            </span>
            <table class="main" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; background: #ffffff; border-radius: 3px;">
              <!-- START MAIN CONTENT AREA -->
              <tr style="border-bottom:1pt solid black;">
                <td class="wrapper" style="font-family: sans-serif; font-size: 14px; vertical-align: top; box-sizing: border-box; padding: 20px;">
                  <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;">
                    <tr>
                      <td style="font-family:'Avenir','Helvetica Neue',Helvetica,'Lucida Grande',sans-serif; font-size: 24px; font-weight:bold; vertical-align: top;">
                        Notable Deaths: ${dateLayout}
                      </td>
                    </tr>
                    <tr>
                      <td style="font-family:'Avenir','Helvetica Neue',Helvetica,'Lucida Grande',sans-serif; font-size: 16px; vertical-align: top;font-style:italic;">
                        Wikipedia's notable deaths, delivered daily to your inbox.
                      </td>
                    </tr>
                    <tr>
                      <td style="font-family:'Avenir','Helvetica Neue',Helvetica,'Lucida Grande',sans-serif; font-size: 14px; vertical-align: top;">
                        View on <a href="${URL}" target="_blank" style="text-decoration: none;color:${linkColor};">Wikipedia →</a>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td class="wrapper" style="font-family: sans-serif; font-size: 14px; vertical-align: top; box-sizing: border-box; padding: 20px;">
                  <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;">
                    <tr>
                      <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">
                        ${content}
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td class="wrapper" style="font-family: sans-serif; font-size: 14px; vertical-align: top; box-sizing: border-box; padding: 20px;">
                  <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;">
                  <tr>
                  <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">
                    ----
                  </td>
                </tr>
                <tr>
                  <td style="font-family:'Avenir','Helvetica Neue',Helvetica,'Lucida Grande',sans-serif; font-size: 14px; vertical-align: top;">
                    Made by <a href="https://twitter.com/stradamoney" target="_blank" style="text-decoration: none; color: ${linkColor}; ">Nico Estrada</a>.
                  </td>
                </tr>
                <tr>
                  <td style="font-family:'Avenir','Helvetica Neue',Helvetica,'Lucida Grande',sans-serif; font-size: 14px; vertical-align: top;">
                    Missed a day? <a href="https://deaths.today/${moment(currentDate)
                      .subtract(2, 'days')
                      .format('YYYY/MMMM/D')
                      .toLowerCase()}" style="text-decoration: none; color:${linkColor};">See day before → </a>
                  </td>
                </tr>
                <tr>
                  <td style="font-family:'Avenir','Helvetica Neue',Helvetica,'Lucida Grande',sans-serif; font-size: 14px; vertical-align: top;">
                    Want to receive emails? <a href="https://cdn.forms-content.sg-form.com/05a18d80-b46f-11ed-b29b-c6958c25fa58" target="_blank" style="text-decoration: none; color:${linkColor};">Subscribe here → </a>
                  </td>
                </tr>
                  </table>
                </td>
              </tr>
            <!-- END MAIN CONTENT AREA -->
            </table>
            <!-- START FOOTER -->
            <div class="footer" style="clear: both; Margin-top: 10px; text-align: center; width: 100%;">
              <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;">
              </table>
            </div>
            <!-- END FOOTER -->
          <!-- END CENTERED WHITE CONTAINER -->
          </div>
        </td>
        <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">&nbsp;</td>
      </tr>
    </table>
  </body>
  </html>`
  }
//end template

const cleanseLinks = ($) => {
  return $('a').each(function () {
    var oldHref = $(this).attr('href')
    var newHref =
      !!oldHref && oldHref.charAt(0) == '/' ? 'https://wikipedia.org' + oldHref : oldHref
    $(this).attr('href', newHref)
    $(this).attr('target', '_blank')
    
  })
}

const removeRefs = ($) => {
  return $('sup').each(function () {
    $(this).remove()
  })
}

const makeDir = (folderPath) => {
    return new Promise((resolve, reject) => {
        fs.mkdir(folderPath, {recursive: true}, (err) => {
            if (err) return reject(err)
            else return resolve(true)
        })
    })
}

//logic
request(URL, async (error, response, body) => {
  if (error) throw new Error('Something is not working right', error)

  const $ = cheerio.load(body);
  cleanseLinks($)
  removeRefs($)

  const deaths = $('h3').next().next().next().next().next('ul').html()
  const dir = `./public/${yesterday.format('YYYY/MMMM')}`
  const filename = `${yesterday.format('D')}.html`
  let created = await makeDir(dir);
  fs.writeFileSync(`${dir}/${filename}`, template(deaths))
  console.log(`Grabbing who died on ${dateLayout}...`)
  fs.writeFileSync(`./public/index.html`, template(deaths))

  console.log("Success...check the root folder")
})