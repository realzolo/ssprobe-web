import { useEffect, useState } from "react";
import Header from "./components/Header";
import List from "./components/List";
import Footer from "./components/Footer";

function App() {
  document.body.setAttribute('arco-theme', 'dark');
  const [config, setConfig] = useState({});
  useEffect(() => {
    (async () => {
      let response, atLocal = false;
      try {
        // 请求本地配置文件
        response = await fetch("config.json");
        atLocal = true;
      } catch (error) {
        // 请求服务器配置文件
        response = await fetch("http://127.0.0.1:10240/ws");
      } finally {
        const _config = await response.json();
        setConfig({
          SITE_TITLE: _config.site_title,
          WEBSOCKET_URL: atLocal ? _config.websocket_url : "ws://127.0.0.1:" + _config.websocket_port
        })
      }
    })()
  }, [])

  return (
    <div className="app_wrapper">
      <Header config={config} />
      <List config={config} />
      <div style={{height: "20vh"}}/>
      <Footer/>
    </div>
  );
}

export default App;
