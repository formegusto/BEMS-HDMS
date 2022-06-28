# BEMS-HDMS / Back-End

## ARIA Encryption Processing

BEMS-HDMS Service에서 BackEnd Server와 데이터 통신을 진행하는 경로는 4가지로 구분할 수 있다.

![Untitled](BEMS-HDMS%20Back-End%20dfbab3b0184847888782fd0a29c54012/Untitled.png)

1. **[ WebBrowser : BackEnd ]** Web Service 진행 경로
2. **[ Open API Service Process ]**
3. **[ Sensor : BackEnd ]** Human Data를 송 수신 경로
4. **[ BackEnd : Database ]** Stored Data 입 출력 경로

다음의 경로를 프로토콜의 관점으로 바라보면 아래와 같이 크게 2가지로 구분지을 수 있다.

1. **HTTP Communication** - [ WebBrowser : BackEnd Server ] / [ Open API Service Process ] / [ Sensor : BackEnd Server ]
2. **Database Communication** - [ BackEnd : Database ]

그리고 이를 Node.js에서의 웹 서버 구성요소들의 관점에서 바라보면 **1) Express Middleware, 2) Sequelize Access Property** 의 개념을 통하여 송신하기 전에 암호화를, 수신하기 전에 복호화를 진행시키도록 구성하여 암호화 통신을 진행하도록 구성할 수 가 있다.

**[ Express Middleware ]**

![Untitled](BEMS-HDMS%20Back-End%20dfbab3b0184847888782fd0a29c54012/Untitled%201.png)

사용자가 웹 브라우저에 접근하게 되면 다음과 같이 암호화통신을 위한 Session Cert Process를 진행하고 있다는 것을 알리는 Spinner가 나타난다. [Session Cert는 비대칭키를 활용한 대칭키 암호화 통신 확립 프로세스](https://github.com/formegusto/Session-Cert)로, BEMS-HDMS Service에서는 **비대칭키, AES를 활용한 대칭키, ARIA 암호화 통신 확립 프로세스**로 정의를 내릴 수가 있다.

```tsx
app.use(decryptBody, Routes, encryptBody);
```

Web Service, Open API, Sensor Data 송 수신을 진행하는 **모든 라우터의 API에 접근하기 이전에는 FrontEnd로 부터 보내온 암호화 데이터를 복호화하기 위한 decryptBody 함수모듈을, API 작업 수행 후에는 응답 데이터를 암호화하기 위한 encryptBody 함수 모듈을 양쪽으로 위치**시켜준다.

![Untitled](BEMS-HDMS%20Back-End%20dfbab3b0184847888782fd0a29c54012/Untitled%202.png)

![Untitled](BEMS-HDMS%20Back-End%20dfbab3b0184847888782fd0a29c54012/Untitled%203.png)

추가적으로 [ Open API Service Process ], [ Sensor : BackEnd ] 의 통신 경로 상에서는 Session Cert의 방법이 아닌 다른 방법이 사용된다.

- **Open API Service Process** - Service 에서는 사용자가 API 사용 요청을 하면, 관리자가 승인해주었을 때 Open API를 사용할 수 있으며, 이 때 API KEY가 발급이 된다. 이 **API KEY는 Open API 과정에서의 대칭키로 사용**이 된다. 이 또한 Session Cert가 적용되어 있는 WebBrowser와 BackEnd 사이에 넘어오는 데이터이기 때문에 통신 상에서 유출되지 않는 KEY 이다.

![Untitled](BEMS-HDMS%20Back-End%20dfbab3b0184847888782fd0a29c54012/Untitled%204.png)

[\* Console Service의 자세한 처리 과정은 Front-End Docs 에서](https://github.com/formegusto/BEMS-HDMS/tree/master/bh-fe)

- Sensor : BackEnd - 위 에서의 두 경로에 적용한 암호화 프로세스는 소스와 통신 상에 키 유출 때문에 적용한 것 이다. **Sensor와 같은 경우에는 소스 유출의 위험성이 거의 없는 편이기 때문에 미리 BackEnd Server와 합의된 대칭키를 공유한 상태에서 암호화 통신을 진행**하면 된다.

**[ Sequelize Access Property ]**

```tsx
username: {
  type: DataTypes.STRING,
  unique: true,
  allowNull: false,
  set(val: any) {
    ariaBeforeInDB(this, val, "username");
  },
  get() {
    return ariaAfterOutDB(this, "username");
  },
},
```

sequelize는 model을 정의할 때, 접근자 프로퍼티인 set(Database에 삽입되기 전)과 get(Database에서 조회 후)에 기능을 추가시킬 수 있다. 민감정보의 set에는 암호화 적용 문법, get에는 복호화 적용 문법을 작성해준다. **set과 get은 각 각 Database에 삽입되기 전과 Database에서 조회 후와 같은 상황, 오로지 응용 프로그램 단에서만 이루어지기 때문에 결과적으로 통신상에서는 암호화된 데이터만 보여지게 된다.**

![Untitled](BEMS-HDMS%20Back-End%20dfbab3b0184847888782fd0a29c54012/Untitled%205.png)

## ORM Development Strategy

**건물마다 다른 종류 및 다른 수량의 센서들이 설**치가 된다. ( 이제와서 생각해보면 NoSQL을 활용했으면 편했을거라는 생각을 해본다. ) 심지어 나중에 기존 건물의 센서 구조에서 센서가 추가되거나 없어질 수도 있다. 그렇기 때문에 **Sequelize가 동적으로 반응하여 요청으로 들어온 특정 건물의 특정 호 안에 있는 센서들에 대해서만 데이터를 넣도록 ORM 전략을 구성했어야 했다.**

```tsx
const report = await sensor.createTimeReport({});

const information: { [key: string]: any } = {};
const infoKeys = Object.keys(body.information);

for (let i = 0; i < infoKeys.length; i++) {
  const info = await report[
    `create${infoKeys[i][0].toUpperCase() + infoKeys[i].slice(1)}`
  ]({
    value: body.information[infoKeys[i]],
  });
  information[infoKeys[i]] = info.get({ plain: true }).value;
}
```

모든 센서의 **Human Data Information은 TimeReport라는 Database와 1:1의 관계**를 갖는다. 특정 센서로부터 데이터가 수신되면 **해당 센서의 Report를 생성한 후,** **생성된 Report에 해당 센서가 수집한 Human Data Information만을 저장하는 방식으로 구성**했다.
