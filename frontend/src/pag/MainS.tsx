import { $lang } from "@/store/lang"
import { useUnit } from "effector-react"
import Image from "next/image"
import Link from "next/link"
import { mainLang } from "./lang"

export const Main = () => {
    const {currentLang} = useUnit($lang);
    return (
    <main style={{padding: "16px", height: "100%"}}>
        <div className="light"></div>
        <div className="container">
          <div className="wrapper">
            <div className="left">
                <div className="main__image-wrapper">
                    <h1>{mainLang[currentLang].title}</h1>
                    <Image className="main__image" src="https://bwrust.ru/uploads/newBw/main_image.jpg" width={600} height={390} alt="Logo Blackwood" />
                </div>
                <div className="button__list">
                    <Link className="button" href="/shop" >Магазин</Link>
                    <a className="button" target="_blank" href="https://discord.gg/blackwoodrust">Discord</a>
                </div>
                <p className="subtitle">
                {mainLang[currentLang].subtitle}
                </p>
            </div>
            <div className="right">
                <div className="server__list">
                      <a href="steam://run/252490//+connect 109.248.4.110:11111" title="Подключиться к серверу" className="server">
                        <div className="server__left">
                            <h3 className="server__title">
                                BLACKWOOD RUST #1 <br/>
                                <span>[ TRIO/MAX3 | X3/LOOT+ ]</span>
                            </h3>
                            <div>s1.bwrust.ru:11111</div>
                        </div>

                        <div className="server__right">
                          <div>Online - 56</div>
                          <div>Joining - 12</div>
                          <div>Queue - 0</div>
                        </div>

                      </a>
                      <a href="steam://run/252490//+connect 109.248.4.124:11111" title="Подключиться к серверу" className="server">
                          <div className="server__left">
                              <h3 className="server__title">
                                  BLACKWOOD RUST #2<br/>
                                  <span>[ CLASSIC | NO LIMIT ]</span>
                              </h3>
                              <div>s2.bwrust.ru:11111</div>
                          </div>
                          <div className="server__right">
                            <div>Online - 56</div>
                            <div>Joining - 12</div>
                            <div>Queue - 0</div>
                          </div>
                      </a>
                      <a href="steam://run/252490//+connect 109.248.4.125:11111" title="Подключиться к серверу" className="server">
                          <div className="server__left">
                              <h3 className="server__title">
                                  BLACKWOOD RUST #3 <br />
                                  <span>[ X2/MAX5 | SEMI-CLASSIC ]</span>
                              </h3>
                              <div>s3.bwrust.ru:11111</div>
                          </div>
                          <div className="server__right">
                            <div>Online - 56</div>
                            <div>Joining - 12</div>
                            <div>Queue - 0</div>
                        </div>
                      </a>
                      <a href="steam://run/252490//+connect 109.248.4.126:11111" title="Подключиться к серверу" className="server">
                          <div className="server__left">
                              <h3 className="server__title">
                                  BLACKWOOD RUST #4<br/>
                                  <span>[ X5/MAX4 | QUAD ]</span>
                              </h3>
                              <div>s4.bwrust.ru:11111</div>
                          </div>

                          <div className="server__right">
                            <div>Online - 56</div>
                            <div>Joining - 12</div>
                            <div>Queue - 0</div>
                        </div>
                      </a>
                </div>
            </div>
          </div>
        </div>
    </main>
    )
}