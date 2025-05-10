import styled from "styled-components";

// Define prop interfaces for the styled components
interface ActionButtonProps {
  acStatus: boolean;
  loading: boolean;
}

interface StatusIndicatorProps {
  acStatus: boolean;
}

export const ButtonDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ActionButton = styled.button<ActionButtonProps>`
  width: 40px;
  height: 40px;
  color: #fff;
  border-radius: 50%;
  background-color: ${(props) => (props.acStatus ? "red" : "green")};
  cursor: ${(props) => (props.loading ? "wait" : "pointer")};
  opacity: ${(props) => (props.loading ? 0.7 : 1)};
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
`;

export const DisabledButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #ccc;
  color: #666;
  cursor: not-allowed;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
`;

export const ChannelNameText = styled.div`
  font-size: 12px;
  color: #888;
  margin-top: 5px;
`;

export const StatusIndicator = styled.div<StatusIndicatorProps>`
  font-size: 12px;
  font-weight: bold;
  color: ${(props) => (props.acStatus ? "#52c41a" : "#ff4d4f")};
  margin-bottom: 8px;
`;

export const ButtonWrapper = styled.div`
  display: inline-block;
`;
