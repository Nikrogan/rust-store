import Link from "next/link"

export const Main = () => {
    return (
    <main style={{padding: "16px", height: "100%"}}>
        <div className="light"></div>
        <div className="container">
          <div className="wrapper">
            <div className="left">
                <div className="main__image-wrapper">
                    <h1>Проект игровых серверов Rust - BLACKWOOD RUST </h1>
                    <img className="main__image" src="https://bwrust.ru/uploads/newBw/main_image.jpg" />
                </div>
                <div className="button__list">
                    <Link className="button" href="/shop" >Магазин</Link>
                    <a className="button" target="_blank" href="https://discord.gg/blackwoodrust">Discord</a>
                </div>
                <p className="subtitle">
                    Старт! Что тебе доступно?!<br/>
                    Топор, кирка, еда и простой шмот с защитой от холода и радиации.
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
                          <div>Онлайн - 56</div>
                          <div>Присоединяются - 12</div>
                          <div>В очереди - 0</div>
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
                                  <div>Онлайн - 56</div>
                                  <div>Присоединяются - 12</div>
                                  <div>В очереди - 0</div>
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
                              <div>Онлайн - 56</div>
                              <div>Присоединяются - 12</div>
                              <div>В очереди - 0</div>
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
                              <div>Онлайн - 56</div>
                              <div>Присоединяются - 12</div>
                              <div>В очереди - 0</div>
                        </div>
                      </a>
                </div>
            </div>
          </div>
        </div>
    </main>
    )
}