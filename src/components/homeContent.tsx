import styled from "styled-components";

export const HomeContent = () => {

  return (
    <div>
      <Wrapper>
        <h1><span className="blue">E</span>scuela <span className="green">B</span>iblica <span className="yellow">D</span>e <span className="red">V</span>erano 2024</h1>
        <div className="content">
          <h3>VISION</h3>
          <p>
            Marcos 16: 15 Nos enseña que como hijos de Dios debemos
            asumir el compromiso de ir y predicar, ya que es un
            mandato que el señor nos ha comisionado a todos.
          </p>
          <p>
            Y es compartir las <b>Buenas Nuevas</b> de salvación, deseamos
            instruir al niño y poner en sus manos estas herramientas
            para que Dios les use en su hogar, en sus familiar,
            amistades, República Dominicana y en las naciones.
          </p>
        </div>
        <div className="content">
          <h3>PROPOSITO</h3>
          <ul>
            <li>Alcanzar niños de nuestra ciudad con el evangelio.</li>
            <li>Que conozcan a Jesús y le acepten.</li>
            <li>Instruirles sobre el mandato.</li>
            <li>Enseñarles que el señor tiene propósito en su vida.</li>
            <li>Que hay un llamado de parte de Dios para todos.</li>
            <li>Transmitirles amor, templanza, fe, confianza y ternura.</li>
          </ul>
        </div>
        <div className="content">
          <h3>BASE BIBLICA</h3>
          <div className="referencia-biblica">
            <div>
              <p>
                <b>
                  DIA 1
                </b>
              </p>
              <p>
                <i>Si me amas, apacienta mis ovejas</i>
              </p>
              <p>- Juan 21: 17</p>
            </div>

            <div>
              <p>
                <b>DIA 2</b>
              </p>
              <p>
                <i>Id por todo el mundo y predicad</i>
              </p>
              <p>- Marcos 16: 15</p>
            </div>

            <div>
              <p><b>DIA 3</b></p>
              <p>
                <i>Jesús está con nosotros hasta el fin del mundo</i>
              </p>
              <p>- Mateo 28: 20</p>
            </div>
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

const Wrapper = styled.div`
  h1 {
    text-align: center;
  }
  h1, h3 {
    color: white;
    font-weight: bold;
  }
  p {
    text-align: justify;
  }
  .red {
    color: #9a2929;
  }
  .green {
    color: #3e713e;
  }
  .yellow { 
    color: #91911f;
  }
  .blue {
    color: #42a5f5;
  }
  .referencia-biblica {
    display: flex;
    flex-direction: column;
    div {
      margin-bottom: 20px;
      p {
        line-height: 25px;
      }
    }
}

`;
