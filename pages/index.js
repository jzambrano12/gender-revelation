import React, { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import styled from "styled-components";
import { useLocalStorage } from "react-use";
import { isEmpty } from "ramda";
import { Modal } from "../components/modal";
import { ResultModal } from "../components/resultModal";
import BoyHeart from "../public/boy.png";
import GirlHeart from "../public/girl.png";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export default function Home() {
  const [ls, setLs] = useLocalStorage("genderData", {});
  const [data, setData] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const femaleFilter = data.filter((gender) => gender.gender_selected === "F");
  const maleFilter = data.filter((gender) => gender.gender_selected === "M");

  useEffect(() => {
    fetch("/api/users")
      .then((response) => response.json())
      .then((apiData) => {
        setData(apiData);
        setShowModal(true);
      });
  }, []);

  useEffect(() => {
    if (ls.gender_selected) {
      const { first_name, last_name, gender_selected } = ls;
      fetch("/api/users", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ first_name, last_name, gender_selected }),
      })
        .then((response) => response.json())
        .then(() => {
          fetch("/api/users")
            .then((response) => response.json())
            .then((apiData) => {
              setData(apiData);
              setShowModal(true);
            });
        });
    }
  }, [ls]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLs({ first_name: firstName, last_name: lastName });
  };

  const onDragEnd = async (result) => {
    const { destination, source } = result;
    const { droppableId: destinationId } = destination;
    const { droppableId: sourceId } = source;

    if (sourceId === "boy-heart" && destinationId === "boy-team") {
      setLs({ ...ls, gender_selected: "M" });
    } else if (sourceId === "girl-heart" && destinationId === "girl-team") {
      setLs({ ...ls, gender_selected: "F" });
    } else {
      alert("Colocaste mal el corazon");
    }
  };

  return (
    <Home.Container className="container">
      <Head>
        <title>¿Niña o Niño? Conoce el genero de nuestro bebe</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link
          href="https://fonts.googleapis.com/css2?family=MonteCarlo&display=swap"
          rel="stylesheet"
        />
      </Head>

      <Home.Main>
        <DragDropContext onDragEnd={onDragEnd}>
          <Home.Header>
            <Home.Information>
              {!ls.gender_selected && (
                <Home.Hearts>
                  <Droppable droppableId="girl-heart">
                    {(provided) => (
                      <div ref={provided.innerRef}>
                        <Draggable draggableId={"draggable-pink"} index={1}>
                          {(provided) => (
                            <Home.ImageDraggable
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <Image src={GirlHeart} width={110} height={110} />
                            </Home.ImageDraggable>
                          )}
                        </Draggable>
                      </div>
                    )}
                  </Droppable>
                  <Droppable droppableId="boy-heart">
                    {(provided) => (
                      <div ref={provided.innerRef}>
                        <Draggable draggableId={"draggable-blue"} index={2}>
                          {(provided) => (
                            <Home.ImageDraggable
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <Image src={BoyHeart} width={110} height={110} />
                            </Home.ImageDraggable>
                          )}
                        </Draggable>
                      </div>
                    )}
                  </Droppable>
                </Home.Hearts>
              )}
              <Home.Gender>
                <span>Niña</span>
                <span>o</span>
                <span>Niño</span>
              </Home.Gender>
              <Home.Subtitle>¿Qué será el bebé?</Home.Subtitle>
            </Home.Information>
          </Home.Header>
          <Home.Body>
            {!isEmpty(ls) ? (
              <Home.Columns>
                <Droppable
                  droppableId="girl-team"
                  style={{ borderWidth: 2, borderColor: "red" }}
                >
                  {(provided) => (
                    <Home.LeftColumn ref={provided.innerRef}>
                      <Home.TeamTitle color={"#de47ad"}>
                        Equipo Niña
                      </Home.TeamTitle>

                      <Home.Items>
                        {femaleFilter.map((item) => (
                          <Home.Item color={"#de47ad"}>
                            {item.first_name}
                          </Home.Item>
                        ))}
                      </Home.Items>
                    </Home.LeftColumn>
                  )}
                </Droppable>
                <Droppable droppableId="boy-team">
                  {(provided) => (
                    <Home.RightColumn ref={provided.innerRef}>
                      <Home.TeamTitle color={"#47b6de"}>
                        Equipo Niño
                      </Home.TeamTitle>

                      <Home.Items>
                        {maleFilter.map((item) => (
                          <Home.Item color={"#47b6de"}>
                            {item.first_name}
                          </Home.Item>
                        ))}
                      </Home.Items>
                    </Home.RightColumn>
                  )}
                </Droppable>
              </Home.Columns>
            ) : (
              <Home.Formulario onSubmit={handleSubmit}>
                <Home.Input
                  placeholder={"Nombre"}
                  onChange={(event) => setFirstName(event.target.value)}
                />
                <Home.Input
                  placeholder={"Apellido"}
                  onChange={(event) => setLastName(event.target.value)}
                />
                <Home.CTA
                  type={"submit"}
                  disabled={firstName.length === 0 || lastName.length === 0}
                >
                  COMENZAR
                </Home.CTA>
              </Home.Formulario>
            )}
          </Home.Body>
          {isEmpty(ls) && showModal && (
            <Modal onClose={() => setShowModal(false)} />
          )}
          {ls.gender_selected && <ResultModal />}
        </DragDropContext>
      </Home.Main>
    </Home.Container>
  );
}

Home.Container = styled.div`
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  overflow-y: auto;
  overflow-x: hidden;
`;

Home.Main = styled.div`
  background: rgb(255, 255, 239);
  background: linear-gradient(
    180deg,
    rgba(255, 255, 239, 1) 0%,
    rgba(255, 255, 255, 1) 100%
  );
  display: flex;
  flex-direction: column;
  height: 100%;
`;

Home.Header = styled.section`
  display: flex;
  justify-content: center;
`;
Home.Information = styled.div`
  display: flex;
  width: 25%;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    width: 90%;
  }
`;
Home.Gender = styled.h1`
  width: 100%;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;

  > span {
    color: #232323;
    font-family: "MonteCarlo", cursive;
    font-size: 80px;
  }

  > span:nth-child(2) {
    font-size: 50px;
  }

  @media (max-width: 768px) {
    > span {
      color: #232323;
      font-family: "MonteCarlo", cursive;
      font-size: 60px;
    }

    > span:nth-child(2) {
      font-size: 30px;
    }
  }
`;
Home.Subtitle = styled.span`
  letter-spacing: 1px;
  font-weight: lighter;
  font-size: 25px;
  margin-top: -10px;

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;
Home.ImageDraggable = styled.div``;
Home.Hearts = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-top: 50px;
`;
Home.Body = styled.section`
  display: flex;
  flex: 1;
  margin-top: 30px;
`;
Home.Columns = styled.div`
  display: flex;
  flex: 1;
`;
Home.Formulario = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  padding-top: 40px;
`;
Home.Input = styled.input`
  width: 300px;
  height: 50px;
  margin-bottom: 20px;
  border-radius: 10px;
  border: none;
  background-color: #d2d2d2;
  text-align: center;
  font-size: 20px;
  transition: all 0.5s ease;

  &:hover {
    background: rgb(242, 12, 136);
    background: linear-gradient(
      90deg,
      rgba(242, 12, 136, 0.3) 0%,
      rgba(0, 201, 242, 0.3) 100%
    );
  }

  &:focus {
    outline: none;
  }
`;
Home.CTA = styled.button`
  width: 200px;
  height: 50px;
  background: rgb(242, 12, 136);
  background: linear-gradient(
    90deg,
    rgba(242, 12, 136, 1) 0%,
    rgba(0, 201, 242, 1) 100%
  );
  border: none;
  color: white;
  font-weight: bold;
  font-size: 16px;
  border-radius: 50px;
  transition: all 0.5s ease;
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: default;
  }
`;
Home.LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  width: 50%;
  border: 1px solid rgb(206, 186, 153);
  border-left-width: 0;
  border-bottom-width: 0;
`;

Home.TeamTitle = styled.h1`
  color: ${({ color }) => color};
  font-weight: lighter;
  text-transform: capitalize;

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

Home.RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  width: 50%;
  border: 1px solid rgb(206, 186, 153);
  border-right-width: 0;
  border-bottom-width: 0;
`;

Home.Items = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: auto;
  box-sizing: border-box;
  flex-wrap: wrap;
  padding: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: flex-start;
  }
`;

Home.Item = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: capitalize;
  color: ${({ color }) => color};
  border-radius: 10px;
  background-color: rgb(199, 199, 199, 0.3);
  margin-bottom: 20px;
  max-height: 20px;
  padding: 8px 20px;
  margin-right: 20px;

  @media (max-width: 768px) {
    margin-right: 0;
    padding: 8px 0;
  }
`;
