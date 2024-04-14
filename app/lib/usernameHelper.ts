import { isUTFPRUser } from './helper';

export type UsernameCheckResult = {
	valid: boolean;
	reason: string;
};

// Checks the username rules, returns
export function checkValidUsername(username: string): UsernameCheckResult {
	// Check for spaces
	if (username.includes(' ')) {
		return {
			valid: false,
			reason: 'O nome de usuário não pode conter espaços.',
		};
	}

	// Check for special characters, except _ and -
	if (/[^a-zA-Z0-9_-]/.test(username)) {
		return {
			valid: false,
			reason: 'O nome de usuário só pode conter letras, números, _ e -.',
		};
	}

	// Check for UTFPR username
	if (isUTFPRUser(username)) {
		return {
			valid: false,
			reason: "O nome de usuário não deve seguir o padrão UTFPR ('a' seguido de números).",
		};
	}

	// Check for length
	if (username.length < 2) {
		return {
			valid: false,
			reason: 'O nome de usuário deve ter no mínimo 2 caracteres.',
		};
	}

	return {
		valid: true,
		reason: '',
	};
}
