import React from "react";
import styled from "styled-components";
import Image from "next/image";
import BabyBoy from "../public/baby-boy.png";
import { useLocalStorage } from "react-use";

export const ResultModal = ({ onClose }) => {
  const [ls] = useLocalStorage("genderData");
  const isBoy = ls.gender_selected === "M";
  return (
    <ResultModal.Container>
      <ResultModal.Backdrop onClick={onClose} />
      <ResultModal.Content>
        <ResultModal.Header>
          <Image src={BabyBoy} width={200} height={200} />
          <ResultModal.Title>
            {isBoy ? "Es correcto," : "Incorrecto..."} ¡Será un{" "}
            <span style={{ color: "#1087e1" }}>Niño</span>!
          </ResultModal.Title>
        </ResultModal.Header>
        <ResultModal.Body>
          <ResultModal.Paragraph>
            Asi es.. Nuestro terruñito sera un niño y su nombre sera{" "}
            <strong style={{ fontSize: 20 }}>Benjamín Zambrano González</strong>
            !
          </ResultModal.Paragraph>
          <ResultModal.Paragraph>
            Muchas gracias por participar e interesarte por conocer el sexo de
            nuestro bebe.
          </ResultModal.Paragraph>
          <ResultModal.Paragraph>
            Tanto Marzia como yo, estamos muy emocionados, tanto que no nos cabe
            la alegria en el pecho!
          </ResultModal.Paragraph>
        </ResultModal.Body>
      </ResultModal.Content>
    </ResultModal.Container>
  );
};

ResultModal.Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  box-sizing: border-box;
`;
ResultModal.Backdrop = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.7);
`;
ResultModal.Content = styled.div`
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
ResultModal.Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
ResultModal.Title = styled.h1`
  text-align: center;
  font-weight: bold;
`;
ResultModal.Paragraph = styled.p``;
ResultModal.Body = styled.div``;
