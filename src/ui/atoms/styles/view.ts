import styled from 'styled-components/native';
import { Surface } from 'react-native-paper';

export const CenteredView = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const CenteredSafeArea = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const CenteredViewRow = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: relative;
`;

export const CenteredSafeAreaRow = styled.SafeAreaView`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const RowView = styled.View`
  flex-direction: row;
`;

export const CenteredSurface = styled(Surface)`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
