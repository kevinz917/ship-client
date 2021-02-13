import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { Row } from "react-bootstrap";
import { countShips } from "../api/ship";
import { MainBtn } from "../global_styles/button";
import { Body } from "../global_styles/typography";
import "../global_styles/animation.css";
import { Base } from "../util/base";
import { initAmplitude, sendAmplitudeData } from "../util/amplitude";
import { Accordion, Card } from "react-bootstrap";
import AccordionContext from "react-bootstrap/AccordionContext";
import { useAccordionToggle } from "react-bootstrap/AccordionToggle";
import { FaChevronRight } from "react-icons/fa";

const StyledTitle = styled.span`
  font-size: 60px;
  font-weight: 700;
  line-height: 1.2;

  @media (max-width: 450px) {
    font-size: 40px;
    font-weight: 700;
  }
`;

const StyledTitle2 = styled.span`
  font-size: 24px;
  font-weight: 700;
  font-style: italic;
  color: ${({ theme }) => theme.primaryDark};
`;

const StyledDescription = styled.span`
  font-size: 20px;
  color: ${({ theme }) => theme.primaryDark};
`;

const StyledCard = styled(Card)`
  background-color: transparent;
  border: none !important;
  border-bottom: 1px solid ${({ theme }) => theme.primaryDark} !important;
  transition: border 0.2s linear;
  border-radius: 0;
  font-weight: 500;
  color: ${({ theme }) => theme.primaryDark};

  .active {
    border-bottom: 1px solid ${({ theme }) => theme.primaryDark} !important;
    color: ${({ theme }) => theme.primaryDark};
  }
`;

const StyledHoverText = styled.span`
  cursor: pointer;
  font-weight: 500;
  font-size: 20px;
  color: ${({ theme }) => theme.primaryDark};
`;

const StyledChevron = styled(FaChevronRight)`
  transition: transform 0.4s ease;
  border-bottom: none !important;
  &.active {
    transform: rotateZ(90deg);
    border-bottom: none !important;
  }
`;

const StyledContainer = styled.div`
  padding: 0px 100px;
  @media (max-width: 450px) {
    padding: 20px !important;
  }
`;

// Custom accordion component
function ContextAwareToggle({ eventKey, callback, question }) {
  // Current active item
  const currentEventKey = useContext(AccordionContext);

  const decoratedOnClick = useAccordionToggle(
    eventKey,
    () => callback && callback(eventKey)
  );

  // Is this one currently active?
  const isCurrentEventKey = currentEventKey === eventKey;

  return (
    <StyledHoverText
      className={`${
        !isCurrentEventKey ? "" : "active"
      }  d-flex justify-content-between p-2`}
      onClick={decoratedOnClick}
    >
      {question}
      <StyledChevron
        // Rotate arrow when active
        className={`${!isCurrentEventKey ? "" : "active"} my-auto`}
      />
    </StyledHoverText>
  );
}

// console.log("sending data");
// sendAmplitudeData("visit_landing");

const About = () => {
  // const [shipCnt, setShipCnt] = useState(-1);
  // const [loading, setLoading] = useState(1);

  const faqs = [
    {
      title: "How does this work?",
      contents:
        "You anonymously submit the names of two friends that you think would be perfect for each other, and we’ll let them know. Yes, you can ship yourself with your crush. They won’t know 😉",
    },
    {
      title: "What privacy settings are there?",
      contents: (
        <div>
          Go to the bottom of the “my matches” page to choose whether or not you
          would like matches involving you to display on the leaderboard. <br />
          <br />
          You can also delete any ships involving you. Search yourself up on the
          leaderboard, click on the three dots underneath the vote count, and
          click “Delete”. The ship will be deleted from both your account and
          the other shippee’s account
        </div>
      ),
    },
    {
      title: "Why would someone ship their friends?",
      contents:
        "Maybe you want to help them with their lackluster romantic life? Or, you may just think that two of your mutuals should get to know each other out so all three of you can hang out and finally play three person card games together. Sometimes, War and ERS get old. Or, maybe you think it’s funny and chaotic—this is Ship’s fundamental purpose so we’re glad to help :,)",
    },
    {
      title: "How do I make a Ship?",
      contents:
        "Head over to the “ship!” tab and click “Add New Ship.” Enter the names of two Yalies who you think would be a match and click “Save.” Once you click “Save,” your ships will show up in your shippees’ “my matches” page. Feel free to edit and re-save your ships at any time! Make up to five ships",
    },
    {
      title: "What happens if I delete a Ship?",
      contents:
        "Your ship will be deleted from the leaderboard and both shippees’ accounts.",
    },
    {
      title: "How does the leaderboard and voting work?",
      contents:
        "When you make a ship and save it, it shows up on the leaderboard. Every time an additional person makes the same ship (i.e., ships the same two people), the vote count increases by ten points. You can also upvote as many ships as you want—each upvote adds one point.",
    },
    {
      title: "Who sees my profile information?",
      contents:
        "Only people that you are shipped with will see your profile information.",
    },

    { title: "Is cereal a soup?", contents: "Yes." },
  ];

  return (
    <StyledContainer className={"my-auto fade-in"}>
      <Row className="mx-auto">
        <StyledTitle>welcome to ship :)</StyledTitle>
      </Row>
      <Row className="mx-auto mt-3">
        <StyledTitle2>Ship friends, vote couples</StyledTitle2>
      </Row>
      <Row className="mx-auto mt-4 mb-4">
        <StyledDescription style={{ maxWidth: "600px" }}>
          One of the best aspects of Yale is meeting and forming relationships
          with new and interesting people—whether this be in friendship,
          romance, or otherwise.
          <br />
          <br />
          While we can’t fully recreate the spontaneity of running into new
          friends, old friends, and those people you’ve seen but never talked to
          on campus, Ship can still induce this sense of excitement and
          randomness through friends’ recommendations.
          <br />
          <br />
          We hope that shippers and shippees alike will find joy in the process
          (and maybe a sprinkle of chaos).
          <br />
          <br />
          Email us at founders@ship.wtf with questions, comments, and ship puns
          :)
        </StyledDescription>
      </Row>
      <Accordion style={{ maxWidth: "600px", paddingBottom: "70px" }}>
        {faqs.map((faq, idx) => (
          <StyledCard key={idx}>
            <div>
              <ContextAwareToggle eventKey={`${idx}`} question={faq.title} />
            </div>
            <Accordion.Collapse eventKey={`${idx}`}>
              <Card.Body className="py-3">{faq.contents}</Card.Body>
            </Accordion.Collapse>
          </StyledCard>
        ))}
      </Accordion>
    </StyledContainer>
  );
};

export default About;
