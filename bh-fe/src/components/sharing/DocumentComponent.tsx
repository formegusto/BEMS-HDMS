import Assets from "src/assets";
import styled from "styled-components";
import Card from "../common/Card";
import CardGroup from "../common/CardGroup";
import BasicCol from "../common/tableItems/BasicCol";
import BasicRow from "../common/tableItems/BasicRow";
import BasicTable from "../common/tableItems/BasicTable";
import TitleCode from "../common/TitleCode";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import { Fab } from "@mui/material";
import ApplyDialog, { ApplyDialogConfig } from "./ApplyDialog";
import { ApiApplication, API_STATUS } from "src/store/apiApplication/types";
import CodeIcon from "@mui/icons-material/Code";

type ConfigProps = {
  show: () => void;
  open: boolean;
  application?: ApiApplication | null;
  moveConsole: () => void;
};

interface Props extends ApplyDialogConfig, ConfigProps {}

function DocumentComponent({
  hide,
  show,
  open,
  application,
  moveConsole,
}: Props) {
  return (
    <Wrap>
      {application && application.status === API_STATUS.NONE ? (
        <Fab
          variant="extended"
          className="fab-apply"
          color="primary"
          onClick={show}
        >
          <HistoryEduIcon sx={{ mr: 1 }} />
          신청하기
        </Fab>
      ) : (
        <Fab
          variant="extended"
          className="fab-apply"
          color="primary"
          onClick={moveConsole}
        >
          <CodeIcon sx={{ mr: 1 }} />
          콘솔이동
        </Fab>
      )}

      {open && <ApplyDialog hide={hide} />}

      <h2 className="subtitle">Document</h2>
      <h4 className="subdescription">
        BEMS-HDMS API Server의 데이터 무결성을 위한 통신 암호화 처리과정과 API
        사용법을 소개합니다.
      </h4>
      <CardGroup>
        <Card
          className="encdecsystemdesc"
          title="BEMS-HDMS API Encryption-Decryption System"
          description={` BEMS-HDMS API는 API Server로부터 사용자에게 데이터가 전달되는 과정에서 데이터의 무결성을 보장하기 위해서 API 신청 시, API Key와 Symmetric Key라는 2개의 Key를 발급합니다.

 API Key는 Server에서 사용자를 식별하기 위한 용도로 사용됩니다. 사용자는 API 호출 시, header의 authorization에는 발급받은 API Key를 넣어주면 됩니다.
         
 Symmetric Key는 Server에서 API Key를 통해 사용자를 식별한 후, 사용자에게 발급한 Symmetric Key를 이용하여, ARIA Algorithm으로 원본데이터를 암호화하여 응답합니다. 사용자는 응답으로 받은 데이터를 Symmetric Key로 복호화하면 원본데이터를 얻을 수 있습니다.`}
          isBorder
        >
          <EncDecProcess.Wrap>
            <EncDecProcess.Item>
              <EncDecProcess.Title>
                BEMS-HDMS API Encrypt Process
              </EncDecProcess.Title>
              <EncDecProcess.Image
                src={Assets.Etc.EncryptProcess}
                alt="암호화 프로세스"
              />
            </EncDecProcess.Item>
            <EncDecProcess.Item>
              <EncDecProcess.Title>
                BEMS-HDMS API Encrypt Process
              </EncDecProcess.Title>
              <EncDecProcess.Image
                src={Assets.Etc.DecryptProcess}
                alt="복호화 프로세스"
              />
            </EncDecProcess.Item>
          </EncDecProcess.Wrap>
        </Card>
        <CardGroup direction="column">
          <Card
            title="PATH PARAMETER"
            description={` BEMS-HDMS API의 수집데이터 엔티티는 건물, 건물의 호, 센서 순으로 1:N 관계로 구성되어 있습니다. /api/bems-hdms 경로를 시작으로, 건물, 건물의 호, 센서의 아이디를 순차적으로 입력해줄수록, 테이블 간의 관계를 줄 일 수 있으며, 더욱 더 가독성이 높은 데이터를 얻을 수 있습니다.`}
            isBorder
          >
            <BasicTable>
              <BasicRow isHead>
                <BasicCol size={180}>PATH</BasicCol>
                <BasicCol isStrech>DESCRIPTION</BasicCol>
              </BasicRow>
              <BasicRow>
                <BasicCol size={180}>/api/bems-hdms</BasicCol>
                <BasicCol isStrech>
                  API의 BASE PATH 입니다. 각 엔티티 관계의 시작점에 존재하는
                  건물들의 정보와 그 안에 건물의 호 리스트, 센서리스트, 센서의
                  기록정보가 제공됩니다.
                </BasicCol>
              </BasicRow>
              <BasicRow>
                <BasicCol size={180}>{` + /{buildingId}`}</BasicCol>
                <BasicCol isStrech>
                  특정 건물을 시작으로, 그 안에 건물의 호 리스트, 센서리스트,
                  센서의 기록정보가 제공됩니다.
                </BasicCol>
              </BasicRow>
              <BasicRow>
                <BasicCol size={180}>{` + /{unitId}`}</BasicCol>
                <BasicCol isStrech>
                  특정 건물의 특정 호를 시작으로, 그 안에 센서리스트, 센서의
                  기록정보가 제공됩니다.
                </BasicCol>
              </BasicRow>
              <BasicRow>
                <BasicCol size={180}>{` + /{sensorId}`}</BasicCol>
                <BasicCol isStrech>
                  특정 센서를 시작으로, 그 안에 센서의 기록정보가 제공됩니다.
                </BasicCol>
              </BasicRow>
            </BasicTable>
          </Card>
          <Card
            title="QUERY PARAMETER"
            description={` BEMS-HDMS API는 사용자들이 원하는 데이터에 보다 더 쉽게 접근할 수 있도록, 아래와 같은 옵션들을 제공합니다. 모든 옵션들은 센서의 기록정보를 메인으로 하여, 제공데이터를 가공합니다.`}
            isBorder
          >
            <BasicTable>
              <BasicRow isHead>
                <BasicCol size={100}>QUERY</BasicCol>
                <BasicCol isStrech>DESCRIPTION</BasicCol>
                <BasicCol size={140}>DEFAULT VALUE</BasicCol>
              </BasicRow>
              <BasicRow>
                <BasicCol size={100}>include</BasicCol>
                <BasicCol
                  isStrech
                >{`얻고자 하는 수집데이터의 종류를 쉼표(,)를 구분자로, 문자열 구성을 하여 Query에 추가하여 요청합니다. 원하는 종류의 데이터를 수집하고 있는 센서들만으로 데이터를 구성하여 응답합니다. 

 * all, isStay(재실유무), residentCount(거주자 수), temperature(온도), humidity(습도), lux(조도), skinTemperature(피부온도), residentDistribution(거주자 분포), satisfaction(만족도) 값만 허용됩니다.`}</BasicCol>
                <BasicCol size={140}>all</BasicCol>
              </BasicRow>
              <BasicRow>
                <BasicCol size={100}>exclude</BasicCol>
                <BasicCol
                  isStrech
                >{`include의 기본 값은 all로 설정되어 있습니다. exclude옵션은 BEMS-HDMS에서 제공해주는 데이터의 모든 종류에서 제외시키고 싶은 데이터의 종류를 쉼표(,)를 구분자로, 문자열 구성을 하여 Query에 추가하여 요청합니다.

 * exclude옵션은 include옵션과는 같이 동작하지 않으며, 우선순위는 include를 우선적으로 합니다.`}</BasicCol>
                <BasicCol size={140}>null</BasicCol>
              </BasicRow>
              <BasicRow>
                <BasicCol size={100}>startDate</BasicCol>
                <BasicCol
                  isStrech
                >{`응답으로 받고 싶은 수집데이터의 시작시간이 있는 경우에 사용합니다.

 * 해당 옵션의 문자열은 ISO8601 Date Format(YYYY-MM-DDThh:mm:ss)을 기준으로 구성합니다.`}</BasicCol>
                <BasicCol size={140}>NOW - 7Day</BasicCol>
              </BasicRow>
              <BasicRow>
                <BasicCol size={100}>endDate</BasicCol>
                <BasicCol
                  isStrech
                >{`응답으로 받고 싶은 수집데이터의 끝시간이 있는 경우에 사용합니다.

 * 해당 옵션의 문자열은 ISO8601 Date Format(YYYY-MM-DDThh:mm:ss)을 기준으로 구성합니다.`}</BasicCol>
                <BasicCol size={140}>startDate + 7Day</BasicCol>
              </BasicRow>
              <BasicRow>
                <BasicCol size={100}>interval</BasicCol>
                <BasicCol
                  isStrech
                >{`startDate로 부터 각 센서의 기록정보리스트에서 처음 파싱되는 데이터를 기준으로 해당옵션의 값을 측정간격으로 데이터리스트를 구성합니다.

 * 센서의 통신상태 및 서버상태에 따라서 센서마다 측정간격이 일정하지 않게 기록될 수 있으며, API Server 내부 로직의 판단에 따라, 특정 수집데이터들은 포함되지 않을 수 있습니다.`}</BasicCol>
                <BasicCol size={140}>null</BasicCol>
              </BasicRow>
              <BasicRow>
                <BasicCol size={100}>limit</BasicCol>
                <BasicCol
                  isStrech
                >{`수집데이터의 개수를 지정하고 싶은 경우에 사용합니다.`}</BasicCol>
                <BasicCol size={140}>null</BasicCol>
              </BasicRow>
              <BasicRow>
                <BasicCol size={100}>offset</BasicCol>
                <BasicCol
                  isStrech
                >{`수집데이터의 개수로부터 페이지를 지정하고 싶은 경우에 사용합니다.

* limit 옵션이 지정되어 있지않으면, 동작하지 않습니다.`}</BasicCol>
                <BasicCol size={140}>null</BasicCol>
              </BasicRow>
            </BasicTable>
          </Card>
        </CardGroup>
      </CardGroup>
      <Card id="response-document" isBorder>
        <CardGroup>
          <Card
            title="Response"
            description={` BEMS-HDMS API의 엔티티들은 시스템 상에서 building(건물), unit(건물의 호), sensor(센서), timeReport(기록) 이름을 가지고 있습니다. 이는 사용자에게 응답으로 전달되는 JSON 필드명으로도 사용이 됩니다. 하나의 객체로 전달될 때는 위의 이름을 그대로 사용해 전달이 되고, 리스트형식의 데이터로 구성되는 경우에는 이름 끝에 복수형을 의미하는 -s가 추가된 상태로 전달됩니다. 

 아래의 문서는 DEPTH1, DEPTH2를 구성으로, DEPTH1에서 각 엔티티를 단수형으로, DEPTH2에서는 각 엔티티안의 프로퍼티에 대한 설명의 구성으로 작성되었습니다.`}
          >
            <BasicTable>
              <BasicRow isHead>
                <BasicCol size={150}>JSON FILED (DEPTH 1)</BasicCol>
                <BasicCol size={150}>JSON FILED (DEPTH 2)</BasicCol>
                <BasicCol isStrech>DESCRIPTION</BasicCol>
              </BasicRow>
              <BasicRow>
                <BasicCol size={150}>[BODY ROOT]</BasicCol>
                <BasicCol size={150}>status: boolean</BasicCol>
                <BasicCol isStrech>요청 처리 상태</BasicCol>
              </BasicRow>
              <BasicRow>
                <BasicCol size={150} colspan={2}>
                  query : option
                </BasicCol>
                <BasicCol isStrech>사용자가 보내온 옵션</BasicCol>
              </BasicRow>
              <BasicRow>
                <BasicCol size={150} colspan={2}>
                  data : humanData
                </BasicCol>
                <BasicCol isStrech>요청에 의해 처리된 데이터</BasicCol>
              </BasicRow>
              <BasicRow>
                <BasicCol size={150} colspan={2}>
                  error : error
                </BasicCol>
                <BasicCol isStrech>에러 정보</BasicCol>
              </BasicRow>
              <BasicRow>
                <BasicCol size={150}>building</BasicCol>
                <BasicCol size={150}>id : number</BasicCol>
                <BasicCol isStrech>건물 고유 아이디</BasicCol>
              </BasicRow>
              <BasicRow>
                <BasicCol size={150} colspan={2}>
                  name : string
                </BasicCol>
                <BasicCol isStrech>건물명</BasicCol>
              </BasicRow>
              <BasicRow>
                <BasicCol size={150}>unit</BasicCol>
                <BasicCol size={150}>id : number</BasicCol>
                <BasicCol isStrech>건물의 호 고유 아이디</BasicCol>
              </BasicRow>
              <BasicRow>
                <BasicCol size={150} colspan={2}>
                  name : string
                </BasicCol>
                <BasicCol isStrech>건물의 호 명</BasicCol>
              </BasicRow>
              <BasicRow>
                <BasicCol size={150}>sensor</BasicCol>
                <BasicCol size={150}>id : number</BasicCol>
                <BasicCol isStrech>센서의 고유 아이디</BasicCol>
              </BasicRow>
              <BasicRow>
                <BasicCol size={150} colspan={2}>
                  name : string
                </BasicCol>
                <BasicCol isStrech>센서명</BasicCol>
              </BasicRow>
              <BasicRow>
                <BasicCol size={150}>timeReport</BasicCol>
                <BasicCol size={150}>id : number</BasicCol>
                <BasicCol isStrech>기록의 고유 아이디</BasicCol>
              </BasicRow>
              <BasicRow>
                <BasicCol size={150} colspan={2}>
                  createdAt : string
                </BasicCol>
                <BasicCol isStrech>{`기록 날짜 및 시간

 * ISO8601 Date Format `}</BasicCol>
              </BasicRow>
              <BasicRow>
                <BasicCol size={150} colspan={2}>
                  isStay : boolean
                </BasicCol>
                <BasicCol isStrech>재실유무</BasicCol>
              </BasicRow>
              <BasicRow>
                <BasicCol size={150} colspan={2}>
                  residentCount : number
                </BasicCol>
                <BasicCol isStrech>거주자 수</BasicCol>
              </BasicRow>
              <BasicRow>
                <BasicCol size={150} colspan={2}>
                  temperature : number
                </BasicCol>
                <BasicCol isStrech>온도</BasicCol>
              </BasicRow>
              <BasicRow>
                <BasicCol size={150} colspan={2}>
                  humidity : number
                </BasicCol>
                <BasicCol isStrech>습도</BasicCol>
              </BasicRow>
              <BasicRow>
                <BasicCol size={150} colspan={2}>
                  lux : number
                </BasicCol>
                <BasicCol isStrech>조도</BasicCol>
              </BasicRow>
              <BasicRow>
                <BasicCol size={150} colspan={2}>
                  skinTemperature : number
                </BasicCol>
                <BasicCol isStrech>피부온도</BasicCol>
              </BasicRow>
              <BasicRow>
                <BasicCol size={150} colspan={2}>
                  sresidentDistribution : number
                </BasicCol>
                <BasicCol isStrech>거주자 분포</BasicCol>
              </BasicRow>
              <BasicRow>
                <BasicCol size={150} colspan={2}>
                  satisfaction : number
                </BasicCol>
                <BasicCol isStrech>만족도</BasicCol>
              </BasicRow>
            </BasicTable>
            <BasicTable>
              <BasicRow isHead>
                <BasicCol size={180}>STATUS CODE</BasicCol>
                <BasicCol isStrech>DESCRIPTION</BasicCol>
              </BasicRow>
              <BasicRow>
                <BasicCol size={180}>200 (OK)</BasicCol>
                <BasicCol isStrech>
                  요청이 처리되어, 응답이 정상적으로 이루어진 상태입니다.
                </BasicCol>
              </BasicRow>
              <BasicRow>
                <BasicCol size={180}>400 (Bad Request)</BasicCol>
                <BasicCol isStrech>
                  Query Option에 올바르지 않은 정보가 있을 때의 상태입니다.
                </BasicCol>
              </BasicRow>
              <BasicRow>
                <BasicCol size={180}>401 (Unauthorized)</BasicCol>
                <BasicCol isStrech>
                  authorization이 공란이거나, 미등록 API KEY의 요청이 들어왔을
                  때의 상태입니다.
                </BasicCol>
              </BasicRow>
              <BasicRow>
                <BasicCol size={180}>403 (Forbidden)</BasicCol>
                <BasicCol isStrech>
                  등록된 API KEY 이지만, 관리자 승인이 되지 않아 요청이 거절된
                  상태입니다.
                </BasicCol>
              </BasicRow>
              <BasicRow>
                <BasicCol size={180}>404 (Not Found)</BasicCol>
                <BasicCol isStrech>잘못된 경로의 API 요청입니다.</BasicCol>
              </BasicRow>
              <BasicRow>
                <BasicCol size={180}>500 (Internal Server Error)</BasicCol>
                <BasicCol
                  isStrech
                >{`요청 정보는 정상적인 상태이지만, 서버에서 처리하지 못 한 경우입니다.

 * 관리자에게 문의 해주세요.`}</BasicCol>
              </BasicRow>
            </BasicTable>
          </Card>
          <Card title="Example">
            <TitleCode
              title="Thinking"
              contents="건물 ID 1번을 가지고 있는 하늘아파트의(buildingId), 건물의 호 ID 1번을 가지고 있는 101호의(unitId) 2021년 12월 18일의 13시 5분부터(startDate=2021-12-18T13:05) 13시 10분까지의(endDate=2021-12-18T13:10) 온도,습도,조도 기록정보를 원한다."
            />
            <TitleCode
              title="Request"
              contents="curl -x “GET” http://{bems-hdms-domain}/api/bems-hdms/1/1?include=temperature,humidity,lux&startDate=2021-12-18T13:05&end Date=2021-12-18T13:10 -H “Accept:text/plain” -H “Auth rization:{API KEY}”"
            />
            <TitleCode
              title="Encrypt Response Body"
              contents={
                'Ë7õnµMÉ¦H\u001a\nãÁI`ï\'ø7\u0010\u0019\u0000©!%ÈèW¦­$zR\n²k\u001a{\u001cµ8çôÎ\u0013ÝnhßI\u001fcnÓòL-¨=L\u0016G$ê\rØ\u00164Ã*Á¦\nóÆ6gí\u0005z°EÑ¤\u0005½\u0013ÓIÿP­ÌáÕÔ´÷¬Âg\u0011m±Êy\u001dÌ³\u0019Yí%6\u0005f3s¡æcOí°Æl È¥\u0018ùª\u0012á\b\u0013\u0013±Í[üOVÉWáÇñÓî\u0014å\u0013:\u0010Á\u0005ü\u0000°¢ÿ$8LrÎý|¹Ût²oaiÃóö÷àÆ*aøøûÓ\u001cÄì)\u0013G+D4©NýrläYj§µÞ»=ÈåA\u0019×¾äÌ\u001d+\u0005ý²¾½¦Ü©N4äÈ\u0011t\u001fÀQóFv­Ðé9)\n\u000eôG+D4©NýrläYj§µÞ\u0010wb¤>ò"EXÑ\r×¸gÁVð<a\r®i«µ\u001aÃmîÀQóFv­Ðé9)\n\u000eôG+D4©NýrläYj§µÞ¶cøQ\u0019á\u0001Ø\u0004V]<\u0012\u0000ï}O\u0019ù±tk¼êÀQóFv­Ðé9)\n\u000eôG+D4©NýrläYj§µÞ?×ä¹d²`\\Õ¢\u001d\u0012\u0015¨\u001dÉ3IU¾\\Ý\t¤E÷\u0003\u0011ZÀQóFv­Ðé9)\n\u000eôG+D4©NýrläYj§µÞnT©íµ´£hz\u0019:\u000bM,ù\u0016¼¦"kÓó\u001f<±Ùu@\u0004ÀQóFv­Ðé9)\n\u000eôG+D4©NýrläYj§µÞp\u0011ßýØfüë\u001a~ÎJ£\byßÔ¶]kñ÷Î°¯KÂÛÀQóFv­ ...'
              }
            />
            <TitleCode
              title="Decrypt Response Body"
              contents={`{
                "status": true,
                "query": {
                      "include": "temperature,humidity,lux",
                      "startDate": "2021-12-18T13:05",
                      "endDate": "2021-12-18T13:10"
                },
                "data": {
                      "unit": {
                            "name": "101호",
                            "id": 1,
                                  "sensors": [
                                          {
                                              "name": "온도",
                                              "id": 1,
                                                    "timeReports": [
                                                          {
                                                                "createdAt": "2021-12-18T13:05:12.000Z",
                                                                "temperature": "30.467"
                                                          },
                                                          // …
                                                          {
                                                                "createdAt": "2021-12-18T13:09:58.000Z",
                                                                "temperature": "28.664"
                                                          }
                                                    ]
                                        },
                                        // …`}
            />
            <TitleCode
              title="Error"
              contents={`{
                "status": false,
                "query": {
                      "include": "temperature,humidity,lux",
                      "startDate": "2021-12-1813:05",
                        "endDate": "2021-12-18T13:10"
                },
                "error": {
                      "message": "startDate 가 ISO8601 형식에 맞지 않습니다."
                }
          }`}
            />
          </Card>
        </CardGroup>
      </Card>
    </Wrap>
  );
}

const Wrap = styled.div`
  & .titlecode {
    margin-bottom: 16px;
  }

  & .table {
    padding: 0 8px;
    margin-top: 16px;
  }

  & #response-document {
    margin-top: 32px;
  }

  & .fab-apply {
    position: sticky;

    top: calc(100vh - 100px);
    float: right;

    transform: translateX(-10px) translateY(-10px);
  }
`;

const EncDecProcess = {
  Wrap: styled.div``,
  Item: styled.div`
    margin: 72px 0;
  `,
  Title: styled.h1`
    font-style: normal;
    font-weight: bold;
    font-size: 14px;
    line-height: 16px;

    padding: 16px 10px;
    box-sizing: border-box;
  `,
  Image: styled.img`
    width: 100%;
    object-fit: contain;
  `,
};

export default DocumentComponent;
