import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaMagento, FaTimes } from 'react-icons/fa';

import Header1SVG from '@common/images/landing-1';
import Header2SVG from '@common/images/landing-2';
import Header3SVG from '@common/images/landing-3';
import WavesSvg from '@common/images/waves';
import WavesUpSvg from '@common/images/waves-up';

const Container = styled.div`
    z-index: 1;
    width: 100%;
    height: 80%;
    max-width: 100%;
`;

const Nav = styled.nav`
    background: #101522;
    height: 4.5em;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.2rem;
    position: sticky;
    top: 0;
    z-index: 999;
`;

const NavbarContainer = styled(Container)`
    display: flex;
    padding-left: 2em;
    /* justify-content: center; */
    height: 100%;
    ${Container}
`;

const NavLogo = styled(Link)`
    color: #fff !important;
    justify-self: flex-start;
    cursor: pointer;
    text-decoration: none;
    font-size: 2rem;
    display: flex;
    align-items: center;
`;

const NavIcon = styled(FaMagento)`
    margin-right: 0.5rem;
`;

const HamburgerIcon = styled.div`
    display: none;
    @media screen and (max-width: 960px) {
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        transform: translate(-100%, 60%);
        font-size: 1.8rem;
        cursor: pointer;   
    }
`;

const NavMenu = styled.ul<{ click: any }>`
    display: flex;
    align-items: center;
    list-style: none;
    text-align: center;
    margin-left: auto;
    padding-right: 2em;
      
    @media screen and (max-width: 960px) {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 90vh;
        position: absolute;
        top: 80px;
        opacity: 1;
        transition: all 0.5s ease;
        background-color: #101522;
        left: ${({ click }) => (click ? 0 : '-100%')};
    }
`;

const NavItem = styled.li`
    height: 80px;
    border-bottom: 2px solid transparent;
    border-radius: 2px;
    &:hover {
        border-bottom: 4px solid #fff;
    }
    @media screen and (max-width: 960px) {
        width: 100%;
        &:hover {
            border-bottom: none;
        }
    }
`

const NavLinks = styled(Link)`
    color: #fff;
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 0.5rem 1rem;
    height: 100%;
    
    @media screen and (max-width: 960px) {
        text-align: center;
        padding: 2rem;
        width: 100%;
        display: table;
        &:hover {
            color: #4b59f7;
            transition: all 0.3s ease;
        }
    }
`

const NavItemBtn = styled.li`
    display: flex;

    @media screen and (max-width: 960px) {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
    }
`;

const InfoSec = styled.div<{ lightBg: any }>`
    color: #fff;
    height: 100%;
    display: flex;
    align-items: end;
    background: ${({ lightBg }) => (lightBg ? '#fff' : '#101522')};
`

const InfoRow = styled.div<{ imgStart: any }>`
  display: flex;
  /* margin: 0 -15px -15px -15px; */
  flex-wrap: wrap;
  align-items: center;
  flex-direction: ${({ imgStart }) => (imgStart ? 'row-reverse' : 'row')};
`;

const InfoColumn = styled.div<{ end: boolean }>`
    display: flex;
    justify-content: space-between;
    flex: 1;
    width: 80%;
    height: 100%;
    text-align: ${(props) => props.end ? 'end' : 'start'};
    padding-left: 3em;
    padding-right: 3em;

    @media (min-width: 480px) and (max-width: 1200px) {
        max-width: 100%;
        flex-basis: 100%;
        display: flex;
        justify-content: center;
    }
    @media (min-width: 320px) and (max-width: 480px) {
        max-width: 100%;
        flex-basis: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
`;

const TextWrapper = styled.div`
  max-width: 540px;
  padding-top: 0;
  padding-bottom: 60px;
  
  @media (min-width: 480px) and (max-width: 1200px) {
    padding-bottom: 65px;
  }
  @media (min-width: 320px) and (max-width: 480px) {
    padding-bottom: 65px;  
  }
`;

const ImgWrapper = styled.div<{ start: any }>`
  max-width: 555px;
  display: flex;
  justify-content: ${({ start }) => (start ? 'flex-start' : 'flex-end')};
`;

const TopLine = styled.div<{ lightTopLine: any }>`
  color: ${({ lightTopLine }) => (lightTopLine ? '#a9b3c1' : '#4B59F7')};
  font-size: 18px;
  line-height: 16px;
  font-weight: 700;
  letter-spacing: 1.4px;
  margin-bottom: 16px;
`;

const Img = styled.img`
  padding-right: 0;
  border: 0;
  max-width: 100%;
  vertical-align: middle;
  display: inline-block;
  max-height: 500px;
`;

const Heading = styled.h1<{ lightText: any }>`
  margin-bottom: 24px;
  font-size: 48px;
  line-height: 1.1;
  font-weight: 600;
  color: ${({ lightText }) => (lightText ? '#f7f8fa' : '#1c2237')};
`;

const Subtitle = styled.p<{ lightTextDesc: any }>`
  margin-bottom: 35px;
  font-size: 18px;
  line-height: 24px;
  color: ${({ lightTextDesc }) => (lightTextDesc ? '#a9b3c1' : '#1c2237')};
`;

const Button = styled.button<{ primary: any; big?: any; fontBig?: any }>`
  border-radius: 4px;
  background: ${({ primary }) => (primary ? '#4B59F7' : '#0467FB')};
  white-space: nowrap;
  padding: ${({ big }) => (big ? '12px 64px' : '10px 20px')};
  color: #fff;
  font-size: ${({ fontBig }) => (fontBig ? '20px' : '16px')};
  outline: none;
  border: none;
  cursor: pointer;
  &:hover {
    transition: all 0.3s ease-out;
    background: #fff;
    background-color: ${({ primary }) => (primary ? '#0467FB' : '#4B59F7')};
  }
  @media screen and (max-width: 960px) {
    width: 100%;
  }
`;

const NavBtnLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  padding: 8px 16px;
  height: 100%;
  width: 100%;
  border: none;
  outline: none;
`;

const homeObjOne = {
    primary: true,
    lightBg: false,
    lightTopLine: true,
    lightText: true,
    lightTextDesc: true,
    topLine: 'Marketing Agency',
    headline: 'Lead Generation Specialist for Online Businesses',
    description:
        'We help business owners increase their revenue. Our team of unique specialist can help you achieve your business goals.',
    buttonLabel: 'Get Started',
    svg: <Header1SVG />,
    start: false,
    textEnd: true,
    wavesBottom: true
};

const homeObjTwo = {
    primary: true,
    lightBg: false,
    lightTopLine: true,
    lightText: true,
    lightTextDesc: true,
    topLine: 'Instant Setup',
    headline: 'Extremely quick onboarding process',
    description:
        "Once you've joined, our team of specialist will reach out to you and get you set up in minutes.",
    buttonLabel: 'Learn More',
    svg: <Header2SVG />,
    alt: 'Vault',
    start: true,
    textEnd: false,
    wavesTop: true
};

const homeObjThree = {
    primary: false,
    lightBg: true,
    lightTopLine: false,
    lightText: false,
    lightTextDesc: false,
    topLine: 'Sarah Jeni',
    headline:
        'Ultra helped me increase my revenue by over 3X in less than 3 months!',
    description:
        "Their team is wonderful! I can't believe I didn't start working with them earlier.",
    buttonLabel: 'View Case Study',
    imgStart: 'start',
    svg: <Header3SVG />,
    textEnd: true,
    start: false
};

const homeObjFour = {
    primary: true,
    lightBg: false,
    lightTopLine: true,
    lightText: true,
    lightTextDesc: true,
    topLine: 'Secure Database',
    headline: 'All your data is stored on our secure server',
    description:
        'You will never have to worry about your information getting leaked. Our team of security experts will ensure your records are kept safe.',
    buttonLabel: 'Sign Up Now',
    imgStart: 'start',
    alt: 'Vault',
    start: true
};

const Landing = () => {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);

    const [homeClick, setHomeClick] = useState(false);
    const [servicesClick, setServicesClick] = useState(false);
    const [productsClick, setProductsClick] = useState(false);

    const handleHomeClick = () => {
        setHomeClick(true);
        setProductsClick(false);
        setServicesClick(false);
    }
    const handleServicesClick = () => {
        setHomeClick(false);
        setProductsClick(false);
        setServicesClick(true);
    }
    const handleProductsClick = () => {
        setHomeClick(false);
        setProductsClick(true);
        setServicesClick(false);
    }

    const handleClick = () => setClick(!click);

    const closeMobileMenu = () => setClick(false);

    const Section = ({
        primary,
        lightBg,
        topLine,
        lightTopLine,
        lightText,
        lightTextDesc,
        headline,
        description,
        buttonLabel,
        imgStart,
        textEnd,
        svg,
        start,
    }: any) => {
        return (
            <InfoSec lightBg={lightBg}>
                {/* {wavesTop && <WavesUpSvg />} */}
                <Container>
                    <InfoRow imgStart={imgStart}>
                        <InfoColumn end={textEnd}>
                            {start ? (
                                <>
                                    <ImgWrapper start={start}>
                                        {svg}
                                    </ImgWrapper>
                                    <TextWrapper>
                                        <TopLine lightTopLine={lightTopLine}>{topLine}</TopLine>
                                        <Heading lightText={lightText}>{headline}</Heading>
                                        <Subtitle lightTextDesc={lightTextDesc}>{description}</Subtitle>
                                        <Link to='/register'>
                                            <Button big fontBig primary={primary}>
                                                {buttonLabel}
                                            </Button>
                                        </Link>
                                    </TextWrapper>
                                </>
                            ) : (
                                <>
                                    <TextWrapper>
                                        <TopLine lightTopLine={lightTopLine}>{topLine}</TopLine>
                                        <Heading lightText={lightText}>{headline}</Heading>
                                        <Subtitle lightTextDesc={lightTextDesc}>{description}</Subtitle>
                                        <Link to='/register'>
                                            <Button big fontBig primary={primary}>
                                                {buttonLabel}
                                            </Button>
                                        </Link>
                                    </TextWrapper>
                                    <ImgWrapper start={start}>
                                        {svg}
                                    </ImgWrapper>
                                </>
                            )}
                        </InfoColumn>
                    {/* {wavesBottom && <WavesSvg />} */}
                    </InfoRow>
                </Container>
            </InfoSec>
        )
    }

    return (
        <>
            <Nav>
                <NavbarContainer>
                    <NavLogo to='/'>
                        <NavIcon />
                        VPM
                    </NavLogo>
                    {/* <HamburgerIcon onClick={handleClick}>
                        {click ? <FaTimes /> : <FaBars />}
                    </HamburgerIcon> */}
                    <NavMenu onClick={handleClick} click={click} >
                        <NavItemBtn >
                            {button ? (
                                <>
                                    <NavBtnLink to='/login'>
                                        <Button primary>SIGN IN</Button>
                                    </NavBtnLink>
                                    <NavBtnLink to='/register'>
                                        <Button primary>SIGN UP</Button>
                                    </NavBtnLink>
                                </>
                            ) : (
                                <NavBtnLink to='/sign-up'>
                                    <Button onClick={closeMobileMenu} fontBig primary>SIGN UP</Button>
                                </NavBtnLink>
                            )}

                        </NavItemBtn>
                    </NavMenu>
                </NavbarContainer>
            </Nav>
            <Section {...homeObjOne} />
            
            <Section {...homeObjThree} />
            <Section {...homeObjTwo} />
            {/* <Pricing /> */}
            {/* <Section {...homeObjFour} /> */}
        </>
    );
}

export default Landing;