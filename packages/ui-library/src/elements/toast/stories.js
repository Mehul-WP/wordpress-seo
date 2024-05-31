import { noop } from "lodash";
import PropTypes from "prop-types";
import React, { useCallback, useState } from "react";
import Toast  from ".";
import Button from "../../elements/button";
import { InteractiveDocsPage } from "../../../.storybook/interactive-docs-page";
import { description, component, close, title } from "./docs";
import classNames from "classnames";

const positionClassNameMap = {
	position: {
		"bottom-center": "yst-notifications--bottom-center",
		"bottom-left": "yst-notifications--bottom-left",
		"top-center": "yst-notifications--top-center",
	},
};
const Template = ( { isVisible: initialVisible, setIsVisible: _, position, children, ...props } ) => {
	const [ isVisible, setIsVisible ] = useState( initialVisible );
	const toggleToast = useCallback( () => setIsVisible( ! isVisible ), [ isVisible ] );
	const openToast = useCallback( () => setIsVisible( true ), [] );

	return (
		<>
			<Button onClick={ toggleToast }>Toggle toast</Button>
			<aside
				className={ classNames(
					"yst-notifications",
					positionClassNameMap.position[ position ],
				) }
			>
				<Toast
					{ ...props }
					isVisible={ isVisible }
					setIsVisible={ openToast }
					onDismiss={ toggleToast }
					position={ position }
					id={ "toast" }
				>
					{ children }
				</Toast>
			</aside>
		</>
	);
};
Template.displayName = "Toast";
Template.propTypes = {
	isVisible: PropTypes.bool,
	setIsVisible: PropTypes.func,
};

export const Factory = {
	component: Template,
	parameters: {
		controls: { disable: false },
	},
};

export const withTitle = {
	name: "With title",
	args: {
		children: (
			<>
				<Toast.Title title="Cool title" />
				<p>Hello everyone!</p>
			</>
		),
	},
	parameters: {
		controls: { disable: true },
		docs: { description: { story: title } },
	},
};

export const withDescription = {
	name: "With description",
	args: {
		children: (
			<>
				<Toast.Description description={ [ "Bullet 1", "Bullet 2", "Bullet 3" ] } />
			</>
		),
	},
	parameters: {
		controls: { disable: true },
		docs: { description: { story: description } },
	},
};

export const withClose = {
	name: "With close button",
	args: {
		children: (
			<>
				<div className="yst-flex yst-flex-row-reverse">
					<Toast.Close dismissScreenReaderLabel="Dismiss" />
				</div>
				<p>Hello everyone!</p>
			</>
		),
	},
	parameters: {
		controls: { disable: true },
		docs: { description: { story: close } },
	},
};

export default {
	title: "1) Elements/Toast",
	component: Template,
	argTypes: {
		children: {
			control: "text",
			type: { required: true },
			table: { type: { summary: "node" } },
		},
		id: { control: "text" },
		autoDismiss: { type: "number", description: "Milliseconds for the toast to disappear." },
		isVisible: {
			control: { disable: true },
			type: { required: true },
			table: { type: { summary: "bool" } },
		},
		setIsVisible: {
			control: { disable: true },
			type: { required: true },
			table: { type: { summary: "func" } },
		},
		onDismiss: {
			control: { disable: true },
			type: { required: false },
			table: { type: { summary: "func" } },
		},

		className: {
			control: "text",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "" },
			},
		},
		position: {
			options: [ "bottom-center", "bottom-left", "top-center" ],
			type: "select",
			description: "The position of the toast.",
			table: {
				defaultValue: { summary: "bottom-left" },
			},
		},
	},
	args: {
		isVisible: true,
		setIsVisible: noop,
		id: "toast",
		children: "Hello everyone!",
		position: "bottom-left",
	},
	parameters: {
		docs: {
			description: {
				component,
			},
			page: () => <InteractiveDocsPage stories={ [ withClose, withDescription, withTitle ] } />,
		},
	},
	decorators: [
		( Story ) => (
			<div className="yst-min-h-[12rem]">
				<Story />
			</div>
		),
	],
};
