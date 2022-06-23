# BEMS Human Data Management System

[BEMS-HDMS](http://115.95.190.115:3001/)

## Overview

![Untitled](BEMS%20Human%20Data%20Management%20System%2073f40554b092484bbd695fedcc82ff5a/Untitled.png)

각 건물(Building), 호(Unit)단위로 센서를 설치하여 센서로부터 설치 구역에 대한 사람 관련 데이터(Human Data)를 수집한다. 수집한 데이터를 데이터베이스에 저장하고, **관리자에 의해 허용된 사용자들에 한해 수집한 데이터를 BEMS-HDMS API 호출을 통해 제공해주는 OPEN API Service 구축을 목표**로 한다.

## Goals

| 분류                                            | 설명                                                                                                                                                                                                                                                                                     |
| ----------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| FrontEnd-BackEnd Server와 Session Cert 통신연동 | [ Session-Cert, https://github.com/formegusto/Session-Cert ]Session-Cert의 연구는 해당 Service 구축으로부터 진행이 되었다. HTTPS를 사용하지 않은 암호화 통신 프로세스와 암호 알고리즘은 공개키 방식의 국산 암호기술인ARIA(Academy, Research Institute, Agency)를 조건으로 받고 진행했다. |
| ARIA Encryption Development                     | [ KISA ARIA, https://seed.kisa.or.kr/kisa/algorithm/EgovAriaInfo.do ] 한국인터넷진흥원(KISA)에서 제공하는 ARIA 암호화는 C/C++, Java로 제공이 되어지고 있다. 이를 Javascript화 시키는 것을 목표로 한다.                                                                                   |
| Advanced Sequelize                              | 각 건물, 호들은 모두 한정적인 센서 타입 안에서 제 각기 다른 센서의 구성을 가지고 있다. 이를 어떻게 모델링할 것인지, 모델링되어진 DB에 ORM, Sequelize를 어떤식으로 활용할 것인지 고민해보도록 한다.                                                                                       |
| Open API Process Researching                    | Open API 서비스를 어떻게 제공해줄 것인지에 대한 프로세스를 고민해보도록 한다.                                                                                                                                                                                                            |
| Material-UI Library Use                         | https://mui.com/                                                                                                                                                                                                                                                                         |
| Chart.js Use                                    | https://www.chartjs.org/                                                                                                                                                                                                                                                                 |
