# BEMS-HDMS / Front-End

![Untitled](https://user-images.githubusercontent.com/52296323/176579174-fd102684-198a-48fb-8f31-a531f2157cf9.png)

## ARIA Encrypt Processing

**[ SessionCertConfig Component ]**

```tsx
// src/index.tsx
<Provider store={store}>
  <SessionCertConfig />
  <AuthCheck />
  <AlertModal />
  <Router>
    <ScrollToTop />
    <App />
  </Router>
</Provider>,
```

사용자가 웹 어플리케이션에 접근 시 **초기에 SessionCert 설정을 진행**한다. SessionCertConfig 컴포넌트는 BackEnd와 SessionCert Process를 진행하여 **웹 서비스 상에서의 암호화 통신을 위한 대칭키를 생성 및 검증**한다.

**SessionCert Process 진행 화면**

![Untitled 1](https://user-images.githubusercontent.com/52296323/176579182-fa05cd11-57b1-4cbc-905e-b578fd43cb3c.png)

**Redux SessionCert Store**

<img width="1289" alt="Untitled 2" src="https://user-images.githubusercontent.com/52296323/176579195-37bf0884-5275-4019-8b2b-180ee7f538e2.png">

SessionCert Store에 저장되어 있는 대칭키는 BackEnd에 API를 요청할 때, 응답받을 때 사용된다. 이는 **API요청용 saga함수를 생성하는 createRequestSaga 함수에 Generalization** 되어 있다.

```tsx
return function* (action: SagaAction<P>) {
	// ...
  try {
    if (options?.encryption) {
      const { isEncrypt, isDecrypt } = options.encryption;

			// [request] payload를 암호화 API 요청
      if (isEncrypt) {
        const symKey: string = yield select(
          (state) => state.sessionCert.symmetricKey
        );
        action.payload = symmetricEncrypt(
          JSON.stringify(action.payload),
          symKey
        ) as any;
      }
      const response: AxiosResponse<AR> = yield call(request, action.payload);

			// [response] 응답 데이터 복호화
      if (isDecrypt) {
        const symKey: string = yield select(
          (state) => state.sessionCert.symmetricKey
        );
        const decBody = symmetricDecrypt(response.data as any, symKey);
      }
    }
	// ...
```

## Open API Service

OpenAPI Service를 만들기 위해 **프로세스는 [공공데이터포털](https://www.data.go.kr/)**을 참고하였고, **Document / Console 과 같은 서비스와 디자인은 [Spotify for Developers](https://developer.spotify.com/)**를 참고하였다.

**[ Process ]**

BEMS-HDMS 에서의 Open API Service 는 **사용자 신청 - 관리자 승인 의 구조**로 되어 있다. 관리자 승인 전이라면 Open API Service 소개와 Document 만이 제공된다.

![Untitled 3](https://user-images.githubusercontent.com/52296323/176579212-f42a1591-77d4-4faa-b898-2c88998997a3.png)

- [ 사용자 ] 서비스 소개 페이지에서 Open API 이용목적을 입력해주고 사용신청을 진행한다. 이 때 BackEnd Server에서 API KEY 발급되며, 사용제어는 status column에 의해 제어된다.

![Untitled 4](https://user-images.githubusercontent.com/52296323/176579219-ca31d740-eee8-42dc-a0e4-6ba0316a374e.png)

- [ 관리자 ] 관리자는 이용목적을 확인하고 사용자의 API 상태를 설정해준다.

![Untitled 5](https://user-images.githubusercontent.com/52296323/176579232-59d12c47-631c-4cba-b410-3e915de0303b.png)

- 사용자의 Open API 사용이 승인되면 Console Page에 접근할 수 있는 링크들이 활성된다.

![Untitled 6](https://user-images.githubusercontent.com/52296323/176579240-bb98d374-235c-49de-b9f3-ab2f1b9a37c3.png)

**[ Console Service ]**

![Untitled 7](https://user-images.githubusercontent.com/52296323/176579252-60b26747-5b63-4f60-991f-c993342c324b.png)

BEMS-HDMS 는 HTTPS가 아닌 **자체적으로 연구된 SessionCert 라는 암호 통신 체계**를 사용하고 있기 때문에 **민감데이터를 포함하는 모든 API에는 검증된 대칭키로 암호화된 데이터로의 통신**이 이루어진다. **Open API Service 에서는 사용자에게 발급한 API KEY를 대칭키로 사용하여 사용자별로 다르게 암호화 통신이 되도록 구성**하였는데, 이는 **사용자가 받는 데이터가 암호화 데이터이기 때문에 사용자가 직접 ARIA 복호화 프로그램을 가져야 실제 데이터를 받아볼 수 있다는 단점**을 가진다.

<img width="1247" alt="Untitled 8" src="https://user-images.githubusercontent.com/52296323/176579263-fd7bb35e-2b8a-4297-9cf3-15319e9e6294.png">

BEMS-HDMS 에서의 Console Service의 주 목적은 API Preview가 아닌, **자체적으로 복호화할 수 있는 기능을 제공하고, 이를 Excel로 export시킬 수 있도록 함으로써 사용자가 Open API를 쉽게 사용하기 위함**에 있다.

![Untitled 9](https://user-images.githubusercontent.com/52296323/176579276-83a33db4-cf19-4e07-922c-eb6dff6b175a.png)

## Etc

**[ chart.js ]** 센서 수집 데이터 시각화

![Untitled 10](https://user-images.githubusercontent.com/52296323/176579286-1cbe4d00-9513-4533-9e72-ab51cefbfa4d.png)

**[ react-hook-form ]** form data 관리 및 검증 (매우 신세계급 편리함 이었다,,)

```tsx
// SignUpContainer.tsx
const validateSchema = Yup.object({
  username: Yup.string()
    .matches(
      /^[a-z]+[a-z0-9]/g,
      "소문자로 시작하는 소문자 또는 숫자로만 입력해주세요."
    )
    .min(5, "최소 5자 이상 입력해주세요.")
    .max(15, "최대 15자 이하 입력해주세요.")
    .required(""),
  // ...
});

const {
  control,
  handleSubmit,
  formState: { errors },
} = useForm<SignUpForm>({
  resolver: yupResolver(validateSchema),
  mode: "onTouched",
});
```

![Untitled 11](https://user-images.githubusercontent.com/52296323/176579303-08968c3d-2662-4604-8804-a637e937a199.png)
