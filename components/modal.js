import React from "react";
import styled from "styled-components";

export const Modal = ({ onClose }) => {
  return (
    <Modal.Container>
      <Modal.Backdrop onClick={onClose} />
      <Modal.Content>
        <Modal.Header>
          <Modal.Title>¿Cuál será el genero de nuestro bebé?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Modal.Paragraph>
            Hola, queremos compartir contigo una forma diferente de conocer el
            sexo de nuestro bebé.
          </Modal.Paragraph>
          <Modal.Paragraph>
            Participar es muy fácil, sólo debes seguir las siguientes{" "}
            <strong>instrucciones:</strong>
          </Modal.Paragraph>
          <Modal.Paragraph>
            Primero deberas ingresar tu <strong>Nombre y Apellido</strong>,
            luego, <strong>Arrastra</strong> el corazón que contenga el color
            del género con el que te identifiques a su respectiva columna y a
            continuacion conoceras el sexo del bebé.
          </Modal.Paragraph>
          <Modal.Paragraph>
            <strong>Por ejemplo:</strong> Si piensas que es niño, arrastra el
            corazón azul a la columna del Equipo Niño, por el contrario, si
            piensas que es Niña entonces arrastra el corazón rosa a la columna
            del Equipo Niña!
          </Modal.Paragraph>
          <Modal.Paragraph style={{ fontSize: 14, marginTop: 35 }}>
            PD: Para cerrar esta ventana, debes hacer click fuera del contenedor
            blanco
          </Modal.Paragraph>
        </Modal.Body>
      </Modal.Content>
    </Modal.Container>
  );
};

Modal.Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  box-sizing: border-box;
`;
Modal.Backdrop = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.7);
`;
Modal.Content = styled.div`
  width: 40%;
  z-index: 99;
  background-color: white;
  border-radius: 20px;
  box-sizing: border-box;
  padding: 2rem;
  margin: auto 0;

  @media (max-width: 768px) {
    width: 90%;
  }
`;
Modal.Header = styled.div``;
Modal.Title = styled.h1`
  text-align: center;
  font-weight: bold;
`;
Modal.Paragraph = styled.p``;
Modal.Body = styled.div``;
