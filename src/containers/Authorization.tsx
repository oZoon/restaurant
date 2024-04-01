import i18next from "i18next"
import React, { useCallback } from "react"
import { useHistory } from "react-router-dom"
import styled from "styled-components"

import { WIDTH_576, colors } from "@/constants"
import { allRoutes } from "@/routes"
import { useUserData } from "@/store"
import { Button, H20TitleCSS, Input } from "@/ui"

export const Authorization: React.FC = () => {
  const {
    email,
    message,
    password,
    updateEmail,
    updatePassword,
    submitAuthorization,
  } = useUserData((state) => state)
  const history = useHistory()

  const handleSubmit = useCallback(
    (e?: React.FormEvent<HTMLFormElement>) => {
      e?.preventDefault()
      submitAuthorization().then(
        (success) => success && history.push(allRoutes.menu.path)
      )
    },
    [history, submitAuthorization]
  )

  return (
    <Container onSubmit={handleSubmit}>
      <Wrapper>
        <Title>{i18next.t("authorizationPage.title")}</Title>
        <InputWrapper>
          <Input
            value={email ?? ""}
            onChange={updateEmail}
            inputType="text"
            placeholder={i18next.t("authorizationPage.placeholderEmail")}
          />
        </InputWrapper>
        <InputWrapper>
          <Input
            value={password ?? ""}
            onChange={updatePassword}
            inputType="password"
            placeholder={i18next.t("authorizationPage.placeholderPassword")}
          />
        </InputWrapper>
        <InputWrapper>
          <Button onClick={handleSubmit} buttonType="submit">
            {i18next.t("authorizationPage.submitButtonTitle")}
          </Button>
        </InputWrapper>
        {message !== null && <Error>{message}</Error>}
      </Wrapper>
    </Container>
  )
}

const Container = styled.form`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Wrapper = styled.div`
  width: ${WIDTH_576}px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 30px;
`

const Title = styled.label`
  ${H20TitleCSS}
`

const InputWrapper = styled.div`
  width: 50%;
`
const Error = styled.span`
  ${H20TitleCSS}
  color: ${colors.red};
`
