import { Avatar, Button } from "@mui/material";
import { blue, blueGrey, indigo, red } from "@mui/material/colors";
import { ConnectedProps } from "react-redux";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import Assets from "src/assets";
import { API_STATUS, API_STATUS_MESSAGE } from "src/store/apiApplication/types";
import AuthConnector from "src/store/auth/connector";
import { ContainerWidth1240 } from "src/styles/Container";
import { ACHROMATIC, BLUE } from "src/styles/Palette";
import styled from "styled-components";
import RefreshIcon from "@mui/icons-material/Refresh";
import React from "react";

interface Props extends ConnectedProps<typeof AuthConnector> {}

function HeaderComponent({ user, check, logout }: Props) {
  const onClickLogout = React.useCallback(() => {
    logout();
  }, [logout]);

  return (
    <>
      <Wrap>
        <ContainerWidth1240 className="header-container">
          <LogoBlock>
            <Link to="/">
              <img src={Assets.Symbols.KETILogoHorizontal} alt="KETI LOGO" />
            </Link>
          </LogoBlock>
          <Nav.Wrap>
            <Nav.Option.Block>
              <Nav.Option.Item>Contact Us</Nav.Option.Item>
              <Nav.Option.Item>English</Nav.Option.Item>
            </Nav.Option.Block>
            <Nav.Main.Block>
              <NavLink
                to="/about"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                <Nav.Main.Item>About Us</Nav.Main.Item>
              </NavLink>
              <NavLink
                to="/information"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                <Nav.Main.Item>Data Information</Nav.Main.Item>
              </NavLink>
              <NavLink
                to="/sharing"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                <Nav.Main.Item>
                  Data Sharing
                  {user && user!.apiApplication!.status !== API_STATUS.NONE && (
                    <Nav.Main.DropDown>
                      <NavLink
                        to="/sharing"
                        className={({ isActive }) => (isActive ? "active" : "")}
                        end
                      >
                        <Nav.Main.DropDownItem>Document</Nav.Main.DropDownItem>
                      </NavLink>

                      <NavLink
                        to="/sharing/console"
                        className={({ isActive }) => (isActive ? "active" : "")}
                      >
                        <Nav.Main.DropDownItem>Console</Nav.Main.DropDownItem>
                      </NavLink>
                    </Nav.Main.DropDown>
                  )}
                </Nav.Main.Item>
              </NavLink>

              {user ? (
                <Nav.Main.Item>
                  {user.username}
                  <ProfileDropDown.Wrap className="profile">
                    <ProfileDropDown.ProfileBlock>
                      <Avatar sx={{ bgcolor: blue[500] }}>
                        {user.username[0].toUpperCase()}
                      </Avatar>
                      <ProfileDropDown.ProfileInformation>
                        <p id="organization">{user.organization}</p>
                        <p id="user">
                          <span className="name">{user.name}</span>
                          <span className="username">({user.username})</span>
                        </p>
                      </ProfileDropDown.ProfileInformation>
                      <Button size="small" onClick={onClickLogout}>
                        로그아웃
                      </Button>
                    </ProfileDropDown.ProfileBlock>

                    <ProfileDropDown.ApiStatusBlock>
                      <h1 className="title">
                        API 이용상태
                        <RefreshIcon fontSize="small" onClick={() => check()} />
                      </h1>
                      <p className={`status ${user.apiApplication!.status}`}>
                        {user.apiApplication!.status}
                      </p>
                      <p className="status-description">
                        {
                          API_STATUS_MESSAGE[
                            user.apiApplication!.status as string
                          ]
                        }
                      </p>
                      {(function () {
                        switch (user.apiApplication!.status as any) {
                          case API_STATUS.NONE:
                            return (
                              <Link to="/sharing">
                                <Button variant="outlined">
                                  신청페이지 이동
                                </Button>
                              </Link>
                            );
                          case API_STATUS.ACTIVE:
                            return (
                              <Link to="/sharing/console">
                                <Button variant="outlined">
                                  콘솔페이지 이동
                                </Button>
                              </Link>
                            );
                          default:
                            return null;
                        }
                      })()}
                    </ProfileDropDown.ApiStatusBlock>
                  </ProfileDropDown.Wrap>
                </Nav.Main.Item>
              ) : (
                <NavLink to={"/auth/signin"}>
                  <Nav.Main.Item>Login</Nav.Main.Item>
                </NavLink>
              )}
            </Nav.Main.Block>
          </Nav.Wrap>
        </ContainerWidth1240>
      </Wrap>
    </>
  );
}

const ProfileDropDown = {
  Wrap: styled.div`
    position: absolute;
    top: 100%;
    right: 0;

    background: ${ACHROMATIC[15]};
    color: ${ACHROMATIC[3]};

    transform: scaleY(0);
    transition: 0.2s;
    transform-origin: 0 0;

    border-end-start-radius: 8px;
    border-end-end-radius: 8px;

    box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.9);

    cursor: default;
  `,

  ProfileBlock: styled.div`
    position: relative;

    & > button {
      position: absolute;
      bottom: 8px;
      right: 8px;
    }
    padding: 20px 16px 48px 20px;

    box-sizing: border-box;
    border-bottom: 2px solid #2196f3;

    display: flex;
    flex-direction: row;

    align-items: center;
  `,

  ProfileInformation: styled.div`
    white-space: nowrap;

    margin: 0 0 0 8px;

    & > #organization {
      font-style: normal;
      font-weight: normal;
      font-size: 12px;
      line-height: 14px;

      margin: 0 0 4px;
    }

    & > #user {
      & > .name {
        font-style: normal;
        font-weight: bold;
        font-size: 24px;
        line-height: 28px;
      }
      & > .username {
        font-style: normal;
        font-weight: bold;
        font-size: 18px;
        line-height: 21px;

        display: inline-block;
        margin: 0 0 0 4px;
      }
    }
  `,

  ApiStatusBlock: styled.div`
    padding: 16px 16px 0 16px;
    box-sizing: border-box;

    & > a > button {
      float: right;

      margin: 0 0 16px;
    }

    & > .title {
      font-style: normal;
      font-weight: bold;
      font-size: 16px;
      line-height: 19px;

      margin: 0 0 8px;

      & > .MuiSvgIcon-root {
        float: right;
        cursor: pointer;
      }
    }

    & > p.status-description {
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: 16px;

      padding: 0 0 0 4px;

      margin: 4px 0 24px;
    }
    & > p.status {
      position: relative;

      font-style: normal;
      font-weight: bold;
      font-size: 12px;
      line-height: 14px;

      padding: 0 0 0 18px;

      &::after {
        content: "";
        position: absolute;

        top: 3px;
        left: 4px;

        width: 8px;
        height: 8px;
        border-radius: 4px;
      }

      &.none {
        color: ${blueGrey[400]};
        &::after {
          background: ${blueGrey[500]};
        }
      }

      &.inactive {
        color: ${red[400]};
        &::after {
          background: ${red[500]};
        }
      }

      &.waiting {
        color: ${indigo[400]};
        &::after {
          background: ${indigo[500]};
        }
      }

      &.active {
        color: ${blue[400]};
        &::after {
          background: ${blue[500]};
        }
      }
    }
  `,
};

const Wrap = styled.header`
  width: 100%;

  position: fixed;
  top: 0;
  left: 0;

  background-color: ${ACHROMATIC[15]};
  box-shadow: 0 0 2px 0;

  z-index: 255;

  & > .header-container {
    height: 100px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
`;

const LogoBlock = styled.div`
  display: flex;
  align-items: center;

  & > a > img {
    width: 266px;
  }
`;

const Nav = {
  Wrap: styled.nav`
    flex: 1;

    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;
  `,
  Option: {
    Block: styled.ul`
      height: 24px;
      margin: 18px 0 0;

      display: flex;
      align-items: center;

      font-style: normal;
      font-weight: 500;
      font-size: 10px;
      line-height: 12px;

      color: ${ACHROMATIC[11]};
      box-sizing: border-box;

      & > li:last-child {
        padding: 0 8px 0 8px;
      }

      & > li:not(:last-child) {
        border-right: 1px solid ${ACHROMATIC[11]};
      }
    `,
    Item: styled.li`
      height: 12px;
      cursor: pointer;
      padding: 0 9px 0;
    `,
  },
  Main: {
    Block: styled.ul`
      flex: 1;

      display: flex;

      & > a:not(:last-child) > li {
        margin: 0 34px 0 0;
      }

      & > .active > li {
        &::after {
          transform: scaleX(1);
        }
      }
    `,
    Item: styled.li`
      position: relative;

      padding: 12px 8px 30px;
      box-sizing: border-box;

      font-style: normal;
      font-weight: bold;
      font-size: 14px;
      line-height: 16px;

      color: ${BLUE[1]};

      cursor: pointer;

      &::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;

        width: 100%;
        height: 3px;

        background-color: ${BLUE[0]};
        transform: scaleX(0);

        transform-origin: 0 0;
      }

      &:hover {
        color: rgba(38, 68, 109, 0.7);

        &::after {
          transition: 0.3s;
          transform: scaleX(1);
        }

        & > ul {
          transform: scaleY(1);

          & > a > li {
            color: ${ACHROMATIC[15]};
          }
        }

        & > .profile {
          transform: scaleY(1);
          color: ${ACHROMATIC[3]};
        }
      }
    `,
    DropDown: styled.ul`
      position: absolute;
      top: 100%;
      right: 0;

      padding: 10px 10px 20px 150px;

      box-sizing: border-box;
      background: rgba(38, 68, 109);

      display: flex;
      flex-direction: column;
      align-items: flex-end;

      transform: scaleY(0);
      transition: 0.3s;
      transform-origin: 0 0;

      & > .active > li {
        color: ${BLUE[5]} !important;
      }
    `,
    DropDownItem: styled.li`
      font-style: normal;
      font-weight: bold;
      font-size: 14px;
      line-height: 16px;

      padding: 4px 10px;

      color: transparent;

      text-shadow: 0px 0px 20px rgba(0, 0, 0, 0.9);

      &:hover {
        color: ${BLUE[5]} !important;
      }
    `,
  },
};

export default AuthConnector(HeaderComponent);
