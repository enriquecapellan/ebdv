import { Box, Typography } from "@mui/material";
import { IChild, IGroup, ILeader, ISpecialAgent } from "../../types/models";
import { Card } from "./cardnet.styles";
import QRCode from "react-qr-code";
import { useEffect, useState } from "react";
import { getImage } from "../../services/db/images";

type CardProps = {
  child: IChild;
};

export const Cardnet = ({ child }: CardProps) => {
  const [photo, setPhoto] = useState("");
  useEffect(() => {
    async function getPhoto() {
      const photo = (await getImage(`children.${child.id}.jpg`)) || "";
      setPhoto(photo);
    }
    getPhoto();
  }, [child.id]);

  return (
    <Card agent={child.group.agent}>
      <Box display="flex">
        <img src={photo} alt={child.name} />
        <Box>
          <Box
            height="0.82cm"
            width="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Typography fontWeight="bold" fontSize={11}>
              AGENTE DE {child.group.agent.toUpperCase()}
            </Typography>
          </Box>
          <QRCode
            height="3.18cm"
            width="3cm"
            value={`${window.location.protocol}/${window.location.host}/qr/children/${child.id}`}
          />
        </Box>
      </Box>
      <Box marginLeft="2.4cm" marginTop={1}>
        <Typography lineHeight={1} fontSize={12}>
          NOMBRE
        </Typography>
        <Typography
          marginBottom={1}
          lineHeight={1}
          fontWeight="bold"
          fontSize={12}
        >
          {child.name.toUpperCase()}
        </Typography>
        <Typography lineHeight={1} fontSize={12}>
          DIVISION
        </Typography>
        <Typography lineHeight={1} fontWeight="bold" fontSize={12}>
          {child.group.calling.toUpperCase()}
        </Typography>
      </Box>
    </Card>
  );
};

type GropCardProps = {
  group: IGroup;
};

export const GropCards = ({ group }: GropCardProps) => {
  const [leaderPhoto, setLeaderPhoto] = useState("");
  const [assistantPhoto, setAssistantPhoto] = useState("");

  useEffect(() => {
    async function getPhotos() {
      const leaderPhoto =
        (await getImage(`groups.${group.id}.leader.jpg`)) || "";
      setLeaderPhoto(leaderPhoto);
      const assistantPhoto =
        (await getImage(`groups.${group.id}.assistant.jpg`)) || "";
      setAssistantPhoto(assistantPhoto);
    }
    getPhotos();
  }, [group.id]);

  return (
    <>
      <Card agent={group.agent}>
        <Box display="flex">
          <img src={leaderPhoto} alt={group.leader} />
          <Box>
            <Box
              height="0.82cm"
              width="100%"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Typography fontWeight="bold" fontSize={11}>
                AGENTE DE {group.agent.toUpperCase()}
              </Typography>
            </Box>
            <QRCode
              height="3.18cm"
              width="3cm"
              value={`${window.location.protocol}/${window.location.host}/qr/groups/${group.id}`}
            />
          </Box>
        </Box>
        <Box marginLeft="2.4cm" marginTop={1}>
          <Typography lineHeight={1} fontSize={12}>
            NOMBRE
          </Typography>
          <Typography
            marginBottom={1}
            lineHeight={1}
            fontWeight="bold"
            fontSize={12}
          >
            {group.leader.toUpperCase()}
          </Typography>
          <Typography lineHeight={1} fontSize={12}>
            DIVISION
          </Typography>
          <Typography lineHeight={1} fontWeight="bold" fontSize={12}>
            {group.calling.toUpperCase()}
          </Typography>
        </Box>
      </Card>
      {group.assistant && assistantPhoto && (
        <Card agent={group.agent}>
          <Box display="flex">
            <img src={assistantPhoto} alt={group.assistant} />
            <Box>
              <Box
                height="0.82cm"
                width="100%"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Typography fontWeight="bold" fontSize={11}>
                  AGENTE DE {group.agent.toUpperCase()}
                </Typography>
              </Box>
              <QRCode
                height="3.18cm"
                width="3cm"
                value={`${window.location.protocol}/${window.location.host}/qr/groups/${group.id}`}
              />
            </Box>
          </Box>
          <Box marginLeft="2.4cm" marginTop={1}>
            <Typography lineHeight={1} fontSize={12}>
              NOMBRE
            </Typography>
            <Typography
              marginBottom={1}
              lineHeight={1}
              fontWeight="bold"
              fontSize={12}
            >
              {group.assistant.toUpperCase()}
            </Typography>
            <Typography lineHeight={1} fontSize={12}>
              DIVISION
            </Typography>
            <Typography lineHeight={1} fontWeight="bold" fontSize={12}>
              {group.calling.toUpperCase()}
            </Typography>
          </Box>
        </Card>
      )}
    </>
  );
};

type SpecialCardProps = {
  agent: ISpecialAgent;
};

export const SpecialCardnet = ({ agent }: SpecialCardProps) => {
  const [photo, setPhoto] = useState("");

  useEffect(() => {
    async function getPhotos() {
      const photo = (await getImage(`special-agents.${agent.id}.jpg`)) || "";
      setPhoto(photo);
    }
    getPhotos();
  }, [agent.id]);

  return (
    <Card agent="special">
      <Box display="flex">
        <img src={photo} alt={agent.name} />
        <Box>
          <QRCode
            style={{ marginTop: "0.82cm" }}
            height="3.18cm"
            width="3cm"
            value={`${window.location.protocol}/${window.location.host}/qr/agents/${agent.id}`}
          />
        </Box>
      </Box>
      <Box marginLeft="2.4cm" marginTop={1}>
        <Typography lineHeight={1} fontSize={12}>
          NOMBRE
        </Typography>
        <Typography
          marginBottom={1}
          lineHeight={1}
          fontWeight="bold"
          fontSize={12}
        >
          {agent.name.toUpperCase()}
        </Typography>
      </Box>
      <Box marginLeft="2.4cm" marginTop={1}>
        <Typography lineHeight={1} fontSize={12}>
          CARGO
        </Typography>
        <Typography
          marginBottom={1}
          lineHeight={1}
          fontWeight="bold"
          fontSize={12}
        >
          {agent.position.toUpperCase()}
        </Typography>
      </Box>
    </Card>
  );
};

type LeaderCardProps = {
  leader: ILeader;
};

export const LeaderCard = ({ leader }: LeaderCardProps) => {
  const [photo, setPhoto] = useState("");

  useEffect(() => {
    async function getPhotos() {
      const leaderPhoto = (await getImage(`leaders.${leader.id}.jpg`)) || "";
      setPhoto(leaderPhoto);
    }
    getPhotos();
  }, [leader.id]);

  return (
    <Card agent={leader.agent}>
      <Box display="flex">
        <img src={photo} alt={leader.name} />
        <Box>
          <Box
            height="0.82cm"
            width="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Typography fontWeight="bold" fontSize={11}>
              AGENTE DE {leader.agent.toUpperCase()}
            </Typography>
          </Box>
          <QRCode
            height="3.18cm"
            width="3cm"
            value={`${window.location.protocol}/${window.location.host}/qr/leaders/${leader.id}`}
          />
        </Box>
      </Box>
      <Box marginLeft="2.4cm" marginTop={1}>
        <Typography lineHeight={1} fontSize={12}>
          NOMBRE
        </Typography>
        <Typography
          marginBottom={1}
          lineHeight={1}
          fontWeight="bold"
          fontSize={12}
        >
          {leader.name.toUpperCase()}
        </Typography>
      </Box>
    </Card>
  );
};
