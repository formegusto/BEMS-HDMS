import { Button, TextField } from "@mui/material";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormHandleSubmit,
} from "react-hook-form";
import { SignUpForm } from "src/store/auth/types";
import styled from "styled-components";
import InputGroup from "../common/formItems/InputGroup";
import Rule from "../common/Rule";

type Props = {
  control: Control<SignUpForm, object>;
  onSubmit: ReturnType<UseFormHandleSubmit<SignUpForm>>;
  errors: FieldErrors<SignUpForm>;
};

function SignUpComponent({ control, onSubmit, errors }: Props) {
  return (
    <Wrap onSubmit={onSubmit}>
      <Controller
        name="username"
        control={control}
        render={({ field }) => (
          <TextField
            className="input"
            id="outlined-basic"
            label="아이디"
            variant="outlined"
            error={errors.username && true}
            helperText={errors.username?.message}
            fullWidth
            {...field}
            required
            autoFocus
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <TextField
            id="outlined-basic"
            type="password"
            label="비밀번호"
            variant="outlined"
            error={errors.password && true}
            helperText={errors.password?.message}
            fullWidth
            required
            {...field}
          />
        )}
      />
      <Controller
        name="passwordConfirm"
        control={control}
        render={({ field }) => (
          <TextField
            id="outlined-basic"
            type="password"
            label="비밀번호 확인"
            variant="outlined"
            error={errors.passwordConfirm && true}
            helperText={
              errors.passwordConfirm && "password와 일치하지 않습니다."
            }
            fullWidth
            required
            {...field}
          />
        )}
      />
      <InputGroup>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField
              id="outlined-basic"
              label="성함"
              variant="outlined"
              error={errors.name && true}
              fullWidth
              required
              {...field}
            />
          )}
        />
        <Controller
          name="organization"
          control={control}
          render={({ field }) => (
            <TextField
              id="outlined-basic"
              label="소속기관"
              variant="outlined"
              error={errors.organization && true}
              fullWidth
              required
              {...field}
            />
          )}
        />
      </InputGroup>
      <InputGroup>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              id="outlined-basic"
              type="email"
              label="이메일"
              variant="outlined"
              error={errors.email && true}
              helperText={errors.email?.message}
              fullWidth
              required
              {...field}
            />
          )}
        />
        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <TextField
              id="outlined-basic"
              label="핸드폰 번호"
              variant="outlined"
              error={errors.phone && true}
              helperText={errors.phone?.message}
              fullWidth
              required
              {...field}
            />
          )}
        />
      </InputGroup>
      <Controller
        name="termsOfUse"
        control={control}
        render={({ field }) => (
          <Rule title="이용약관" {...field}>{`제1조 목적
본 약관은 한국지능정보사회진흥원(이하 ‘운영기관’라 한다)에서 운영하는 BEMS-HDMS 서비스를 이용함에 있어 이용조건 및 절차, 운영기관과 이용자의 권리·의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.
        
제2조 용어의 정의
본 약관에서 사용하는 용어의 정의는 다음과 같습니다. 본 약관에서 정의하지 않은 것은 관련 법령 및 서비스별 안내에서 정하는 바에 따르며, 그 외에는 일반 관례에 따른다.
 · 공유서비스 : 공유서비스란 인공지능 서비스에 활용할 수 있는 데이터, SW, 컴퓨팅 자원 등 우수한 정보자원을 공공 및 민간, 법인 및 개인이 원활하게 활용할 수 있도록 다양한 형식과 방식으로 제공하는 것을 말한다.
 · 제공기관 : 제공기관은 기관이 보유하고 있는 우수한 정보자원을 지정된 관리시스템을 통해 활용 가능한 공유서비스의 방식으로 개방, 제공하는 행정기관, 공공기 및 민간 개인과 법인 등을 말한다.
 · 활용기관 : 활용기관은 제공된 공유서비스를 직접 이용하거나 새로운 창작물의 일부로 재가공하여 배포하는 행정기관 등과 개인 및 법인을 말한다.
 · 행정기관 등 : 행정기관 및 공공기관을 행정기관 등 이라 말한다.
 · 회원 : BEMS-HDMS 에 기관 및 기업, 개인 정보를 제공하여 제공기관 또는 활용기관으로 등록한 자로서 BEMS-HDMS 에서 제공하는 서비스를 이용할 수 있는 자.
 · 비밀번호 : 이용자와 회원ID가 일치하는지 확인하고 통신상의 자신의 비밀 보호를 위하여 이용자 자신이 선정한 문자와 숫자의 조합.

제3조 약관의 효력과 변경
 1. BEMS-HDMS는 귀하가 본 약관 내용에 동의하는 경우, BEMS-HDMS의 서비스 제공 행위 및 귀하의 서비스 사용 행위에 본 약관이 우선적으로 적용됩니다.
        `}</Rule>
        )}
      />
      <Controller
        name="privacyPolicy"
        control={control}
        render={({ field }) => (
          <Rule title="개인정보 취급방침" {...field}>
            {`제1조 (개인정보의 처리목적)
  ① BEMS-HDMS 는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 개인정보 보호법 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.
   1. 홈페이지 회원 가입 및 관리
 회원 가입의사 확인, 회원제 서비스 제공에 따른 본인 식별·인증, 회원자격 유지·관리, 제한적 본인확인제 시행에 따른 본인확인, 서비스 부정이용 방지, 만 14세 미만 아동의 개인정보 처리시 법정대리인의 동의여부 확인, 각종 고지·통지, 고충처리 등을 목적으로 개인정보를 처리합니다.
   2. 서비스 제공
 자료 등 서비스 제공, 서비스 성능 향상과 관련한 목적으로 개인정보를 처리합니다.  BEMS-HDMS 는 서비스를 제공함에 따라 발생하는 로그정보를 해지신청 시점까지 보관할 수 있고, 운영기관은 그와 같이 보관하고 있는 사용자 로그정보를 AI허브 서비스의 성능 향상을 위한 연구 용도를 위해 활용할 수 있습니다
   3. 민원사무 처리
 민원인의 신원 확인, 민원사항 확인, 사실조사를 위한 연락·통지, 처리결과 통보 등의 목적으로 개인정보를 처리합니다.

제2조 (개인정보의 처리 및 보유기간)
① BEMS-HDMS는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집시에 동의받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.
② 각각의 개인정보 처리 및 보유 기간은 다음과 같습니다.
1. 홈페이지 회원 가입 및 관리 : 회원가입기간(탈퇴후 즉시 파기)
`}
          </Rule>
        )}
      />

      <Button
        variant="contained"
        color="primary"
        type="submit"
        size="large"
        fullWidth
      >
        Sign Up
      </Button>
    </Wrap>
  );
}

const Wrap = styled.form`
  width: 450px;

  & input {
    filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.25));
  }

  & > div {
    margin: 0 0 16px;
  }

  & > .inputgroup:nth-child(3) {
    margin: 0 0 48px;
  }

  & > .rule {
    margin: 0 0 32px;
  }

  & > button[type="submit"] {
    margin: 40px 0 40px;
  }
`;

export default SignUpComponent;
