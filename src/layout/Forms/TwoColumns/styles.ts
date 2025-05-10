import styled from "styled-components";

export const FormWrapper = styled.section`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	gap: 3rem;
	width: 100%;
	flex-wrap: wrap;

	.form-sections {
		display: flex;
		width: 100%;
		justify-content: space-between;
		gap: 2.4rem;
		flex-wrap: wrap;
	}
`;

export const FormSection = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1.6rem;
	justify-content: left;
	align-items: left;
`;