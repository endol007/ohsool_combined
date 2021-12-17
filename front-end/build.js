const PropertiesReader = require("properties-reader", {
    writer: { saveSections: true },
  });
  const configPath = ".env";
  
  const config = PropertiesReader(configPath);
  const count = config.get("REACT_APP_VERSION_CODE") + 0.1;
  
  var m = new Date();
  var dateString =
    m.getUTCFullYear() +
    "/" +
    ("0" + (m.getUTCMonth() + 1)).slice(-2) +
    "/" +
    ("0" + m.getUTCDate()).slice(-2) +
    "-" +
    ("0" + m.getUTCHours()).slice(-2) +
    ":" +
    ("0" + m.getUTCMinutes()).slice(-2) +
    ":" +
    ("0" + m.getUTCSeconds()).slice(-2);
  
  config.set("REACT_APP_RELEASE_DATE", dateString);
  config.set("REACT_APP_VERSION_CODE", count);
  
  config.save(configPath);