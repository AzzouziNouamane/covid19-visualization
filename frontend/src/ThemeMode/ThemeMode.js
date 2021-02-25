import React from 'react';
import Toggle from 'react-toggle';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'react-toggle/style.css';
import './ThemeMode.scss';


const ThemeMode = ({ mode, onChange }) => {
	return (
		<div className="ThemeMode">
		<Toggle
			id="mode"
			icons={{
				checked: (
					<FontAwesomeIcon icon={faSun} className="fa faSun" />
				),
				unchecked: (
					<FontAwesomeIcon icon={faMoon} className="fa faMoon" />
				),
			}}
			checked={!mode.isDark}
			onChange={onChange}
		/>
	</div>
	);
};

export default ThemeMode;
