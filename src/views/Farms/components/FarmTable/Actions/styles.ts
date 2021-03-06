import styled from 'styled-components'

export const ActionContainer = styled.div`
  padding: 16px;
  // border: 2px solid ${({ theme }) => theme.colors.input};
  // border-radius: 16px;
  flex-grow: 1;
  flex-basis: 0;
  margin-bottom: 16px;

  border: 2px solid ${({ theme }) => theme.colors.input};
  box-shadow: inset 1px 1px 18px 0px ${({ theme }) => theme.colors.background};
  border-radius: 20px;

  ${({ theme }) => theme.mediaQueries.sm} {
    margin-left: 12px;
    margin-right: 12px;
    margin-bottom: 0;
    // max-height: 100px;
  }

  ${({ theme }) => theme.mediaQueries.xl} {
    display: flex;
    justify-content: space-between;
    margin-left: 48px;
    margin-right: 0;
    margin-bottom: 0;
    max-height: 100px;
  }
`

export const ActionTitles = styled.div`
  display: flex;
`

export const ActionContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const ActionTitlesContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 250px;
`

export const ActionTitleContent = styled.div`
  max-width: 50%;
  // ${({ theme }) => theme.mediaQueries.md} {
  //   display: flex;
  //   justify-content: space-between;
  // }
`
