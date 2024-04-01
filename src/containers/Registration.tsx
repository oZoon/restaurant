import i18next from "i18next"
import React, { useCallback } from "react"
import { useHistory } from "react-router-dom"
import styled from "styled-components"

import { colors } from "@/constants"
import { allRoutes } from "@/routes"
import { useUserData } from "@/store"
import { Button, H20TitleCSS, Input } from "@/ui"

export const Registration: React.FC = () => {
  const {
    email,
    message,
    password,
    updateEmail,
    updatePassword,
    submitRegistration,
  } = useUserData((state) => state)
  const history = useHistory()

  const handleSubmit = useCallback(
    (e?: React.FormEvent<HTMLFormElement>) => {
      e?.preventDefault()
      submitRegistration().then(
        (success) => success && history.push(allRoutes.menu.path)
      )
    },
    [history, submitRegistration]
  )

  return (
    <Container onSubmit={handleSubmit}>
      <Title>{i18next.t("registrationPage.title")}</Title>
      <Input
        value={email ?? ""}
        onChange={updateEmail}
        inputType="text"
        placeholder={i18next.t("registrationPage.placeholderEmail")}
      />
      <Input
        value={password ?? ""}
        onChange={updatePassword}
        inputType="password"
        placeholder={i18next.t("registrationPage.placeholderPassword")}
      />
      <ButtonWrapper>
        <Button onClick={handleSubmit} buttonType="submit">
          {i18next.t("registrationPage.submitButtonTitle")}
        </Button>
      </ButtonWrapper>
      {message !== null && <Error>{message}</Error>}
    </Container>
  )
}

const Container = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  gap: 30px;
`

const Title = styled.label`
  ${H20TitleCSS}
`

const Error = styled.span`
  ${H20TitleCSS}
  color: ${colors.red};
`

const ButtonWrapper = styled.div`
  width: 230px;
`
