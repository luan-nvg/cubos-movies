import { Button } from "@/components/Button";
import { FormOneColumn } from "@/layout/Forms/OneColumn";
import styled from "styled-components";

export const SubtitleWrapper = styled.div`
	display: flex;
	justify-content: right;
	margin-bottom: 3.2rem;
`;

export const Wrapper = styled(FormOneColumn)``;

export const NewProject = styled(Button)`
	width: fit-content;
	padding: 1.2rem 2.4rem;
`;

export const RedirectSettings = styled(Button)`
	justify-content: center;
	background-color: transparent;
	color: var(--primary);
	border: 1px solid var(--primary);
	transition: all 0.5s;
`;
