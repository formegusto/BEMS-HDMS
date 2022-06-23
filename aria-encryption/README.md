# ARIA Encryption

ARIA 암호화 기술은 블록 암호 ARIA라고 불리우며, 128-bit 데이터 블록을 처리하는 알고리즘이며, 128, 192, 256 bit 암호키를 사용한다. 3가지 길이의 암호키로 사용될 수 있으며, 길이에 따라 ARIA-128, ARIA-192, ARIA-256으로 구분하여 표기한다. Academy, Research Institute, Agency의 약어로 학•연•관이 공동으로 개발한 정보보호의 핵심 기술임을 나타낸다.

## Algorithm Structure

| 기본 구조 | ISPN(Involutional SPN) 구조, 1) SPN 구조란 Substituion-Permutation-Networks 구조로 S-box(비선형 치환 테이블로 바이트 치환에 사용됨)와 확산 함수가 반복적으로 사용되는 구조를 말한다. 2) Involution 이란 암호화 과정과 복호화 과정이 같은 구조를 나타낸다. |
| --- | --- |
| 입•출력 크기 | 128Bit |
| 키 크기 | 128, 192, 256 Bit |
| 라운드 키 크기 | 128 Bit |
| 라운드 수 | 키 크기에 따라 12, 14, 16 라운드 |

| 구분     | 입•출력 블록 크기 | 입력 키 블록 크기 | 라운드 수 |
| -------- | ----------------- | ----------------- | --------- |
| ARIA-128 | 16                | 16                | 12        |
| ARIA-192 | 16                | 24                | 14        |
| ARIA-256 | 16                | 32                | 16        |

> **Function Structure**

- AddRoundKey - 128Bit 라운드 키를 라운드 입력 128Bit와 비트별 XOR 연산을 수행
- SubstLayer (치환계층) - 두 유형의 치환 계층이 있으며 각각은 2종의 8Bit 입•출력 S-box와 그들의 역변환으로 구성된다.
- DiffLayer (확산계층) - 간단한 16 x 16 involution 이진 행렬을 사용한 바이트 간의 확산 함수로 구성되어 있다.

## Code Analysis

- **Use All Byte Data**

```java
byte[] p = new byte[16]; // plain text
byte[] c = new byte[16]; // cipher text
byte[] mk = new byte[32]; // master key eq.symmetric key
```

- **ARIA Engin Initialize**

```java
ARIAEngine instance = new ARIAEngine(256);
```

해당 과정에서 ARIAEngine instance의 round수와 keysize가 초기화된다.

- **Set Up Basic Information**

```java
instance.setKey(mk);
instance.setupRoundKeys();
```

ARIA 암호화는 키의 크기에 따라 라운드 수가 정해지며, 라운드마다 XOR 연산을 수행할 Round Key를 생성한다. 이 때 setupRoundKeys() 함수에 따라 this.encRoundKeys(암호화 용), this.decRoundKeys(복호화 용) 변수에 값이 대입된다.

- this.encRoundKeys - [doEncKeySetup()] 대칭키, mk로부터 4개의 128-bit 값 W0,W1,W2,W3을 생성한다. 그리고 이를이용하여 암호화 라운드키를 생성한다.
- this.decRoundKeys - [doDecKeySetup()] 복호화 키는 암호화 키로부터 유도된다. 암호화 키의 순서가 변화하고 처음과 마지막 라운드 키를 제외한 암호키를 입력으로 하는 확산함수의 출력이 복호화 라운드 키가 된다.

1. **encrypt, decrypt -** ARIA 암호화는 Involution 구조이다. 그렇기 때문에 암호화, 복호화 과정이 같기 때문에 doCrypt()라는 하나의 함수에서 이루어진다. 이 때, 세번째 매개변수인 rk(RoundKey)에 this.encRoundKeys, this.decRoundKeys의 입력에 따라 암 복호화 모드가 변화한다.

```java
private static void doCrypt(
	byte[] i,
	int ioffset,
	int[] rk, int nr, byte[] o, int ooffset) { }
```

## Use Javascript

Javascript 기반의 ARIA 암호화를 구현하기 위하여 Java로 짜여진 [ARIA.java](http://ARIA.java) 소스를 참고했다. 기존의 ARIA Source 자체가 Legacy 하게 잘 짜여져 있었기 때문에 Javascript와 Java의 변수 표기 방식만을 변경하면 됐었고, 문법적으로 객체지향의 요소인 접근제한자 등을 제공해주고, 변수의 자료형 Tracing이 가능한 Typescript를 사용했기 때문에 변환과정에서 큰 어려움을 겪지 않았다.

![Untitled](https://user-images.githubusercontent.com/52296323/175236904-e2c0a574-2cda-4b00-b72c-4cc3278fb565.png)

> **Problem 1. 한글 Encoding**

![Untitled 1](https://user-images.githubusercontent.com/52296323/175236923-19dfe886-a8d9-469b-ae17-9de78dccf9b6.png)

Java의 String 객체의 getBytes라는 메서드는 Unicode 기반의 글자에서도 잘 동작하도록 만들어져 있지만, JavaScript의 charCodeAt은 이름 그대로 character, 프로그래밍 관점에서 보면 ascii 기반의 code를 넘겨주기 때문에 unicode 기반의 buffer 형식과는 다른 형식이 반환되어 한글과 같은 유니코드 기반의 글자에서는 제대로 된 ARIA프로세스가 이루어지지 않는다.

```tsx
// stringToByte
new TextEncoder().encode(str);

// bytesToString
new TextDecoder().decode(bytes);
```

우리들의 Javascript도 이 문제를 알고 있는지 TextEncode, TextDecoder라는 유니코드 기반의 UIntArray 변환 내장 객체를 지원해준다. 이를 사용하여 문제를 해결했다.

![Untitled 2](https://user-images.githubusercontent.com/52296323/175236941-e07082cf-53ea-4129-a78c-067fb06e65c3.png)

> **Problem 2. 128Bit 이상의 데이터 처리**

![Untitled 3](https://user-images.githubusercontent.com/52296323/175236963-cd973109-69ac-40d5-a36e-4c9f72b629a2.png)

ARIA 암호화는 암호화 키 사이즈에 관련 없이 입 출력 데이터가 128Bit로 고정이 되어있다. KISA 에서 제공해주는 [ARIA.java](http://ARIA.java) 소스파일 또한 128Bit의 데이터 암호화 예제밖에 제공을 안해준다. 128Bit 이상의 데이터는 직접 구현을 진행해주어야 한다.

**[encryptProcess]**

- **ARIA Init**

```tsx
const aria = new ARIAEngine(256);
const mk: Uint8Array = new Uint8Array(32);
aria.setKey(mk);
aria.setupRoundKeys();
```

- **plaintext split -** plain text unicode 단위의 Buffer로 변환한 뒤, 128Bit씩 쪼개어 배열에 담는다.

```tsx
const pt = stringToByte(plainText, "unicode");
const pt16: Uint8Array[] = [];
pt.forEach((p, i) => {
  if ((i + 1) % 16 === 0 || i + 1 === pt.length) {
    pt16.push(pt.slice(Math.floor(i / 16) * 16, i + 1));
  }
});
```

- **encrypt -** 128bit씩 쪼개어진 pt16 배열을 순차적으로 ARIA 암호화를 진행시킨 후, 암호화 결과로 반환되는 cipherText의 Buffer를 문자열로 변환한 뒤 이어 붙인다.

```tsx
let cipherText = "";
pt16.forEach((p) => {
  const c: Uint8Array = new Uint8Array(16);
  aria.encrypt(p, 0, c, 0);
  cipherText += bytesToString(c, "ascii");
});
```

이 때, cipherText Buffer 데이터는 ascii 형식으로 문자열 변환 시켜준다. 그 이유는 이렇게 하나 저렇게 하나 ARIA의 암호화 프로세스 수행 단위는 1Byte 단위이다. Unicode 형식으로 암호화 데이터를 변환 시켜버리면 후에 디코딩 작업에서 원치않은 결과를 받아버리게 될 수 있다. 안정적인 1Byte 단위로 변환시키도록 한다.

**[decryptProcess]**

- **ARIA Init**

```tsx
const aria = new ARIAEngine(256);
const mk: Uint8Array = new Uint8Array(32);
aria.setKey(mk);
aria.setupRoundKeys();
```

- **ciphertext split** - 암호화 문자열을 ascii 단위의 Buffer로 변환한 뒤, 16Bit씩 쪼개어 배열에 담는다.

```tsx
const dt = stringToByte(cipherText, "ascii");
const dt16: Uint8Array[] = [];
dt.forEach((d, i) => {
  if ((i + 1) % 16 === 0) {
    dt16.push(dt.slice(Math.floor(i / 16) * 16, i + 1));
  }
});
```

- **decrypt** - 128Bit씩 쪼개어진 암호화 데이터를 순차적으로 복호화하면서 복호화된 Buffer를 병합해 나간다. 해당 작업이 완료되면 unicode 단위의 문자열 데이터로 변환해준다.

```tsx
let decodedByte: Uint8Array = new Uint8Array(0);
dt16.forEach((d, idx) => {
  const c: Uint8Array = new Uint8Array(16);
  aria.decrypt(d, 0, c, 0);

  const merge = new Uint8Array(decodedByte.length + c.length);
  merge.set(decodedByte);
  merge.set(c, decodedByte.length);

  decodedByte = merge;
});

const decodedText = bytesToString(decodedByte, "unicode");
```

**[ Result ]**

![Untitled 4](https://user-images.githubusercontent.com/52296323/175236981-d38c1c80-d9c7-4664-bfdf-c7bf49454c04.png)

이렇게 구현된 Javascript 기반의 ARIA 암호화 모듈은 [Session Cert, 비대칭키를 활용한 대칭키 암호화 통신 확립(Establish) 프로세스에](https://github.com/formegusto/Session-Cert)서 **대칭키에 해당하는 부분에 쓰일 것** 이다.
