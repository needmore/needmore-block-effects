import { registerPlugin } from '@wordpress/plugins';
import { PanelBody, SelectControl, ToggleControl } from '@wordpress/components';
import { Fragment } from '@wordpress/element';
import { InspectorControls } from '@wordpress/block-editor';
import { createHigherOrderComponent } from '@wordpress/compose';
import { addFilter } from '@wordpress/hooks';

// Define available effects
const effects = [
    { label: 'None', value: '' },
    { label: 'Fade In', value: 'fade-in' },
    { label: 'Slide In', value: 'slide-in' },
    { label: 'Zoom In', value: 'zoom-in' },
    { label: 'Reveal Left to Right', value: 'reveal-left-to-right' },
];

// Add attributes to blocks
const addAttributes = (settings) => {
    if (typeof settings.attributes !== 'undefined') {
        settings.attributes = Object.assign(settings.attributes, {
            visualEffect: {
                type: 'string',
                default: '',
            },
            fadeInWords: {
                type: 'boolean',
                default: false,
            },
        });
    }
    return settings;
};
addFilter('blocks.registerBlockType', 'nmbe/addAttributes', addAttributes);

// Create higher-order component for Inspector Controls
const withInspectorControls = createHigherOrderComponent((BlockEdit) => {
    return (props) => {
        return (
            <Fragment>
                <BlockEdit {...props} />
                <InspectorControls>
                    <PanelBody title="Visual Effects" initialOpen={true}>
                        <SelectControl
                            label="Effect"
                            value={props.attributes.visualEffect}
                            options={effects}
                            onChange={(effect) => props.setAttributes({ visualEffect: effect })}
                        />
                    </PanelBody>
                </InspectorControls>
            </Fragment>
        );
    };
}, 'withInspectorControls');
addFilter('editor.BlockEdit', 'nmbe/withInspectorControls', withInspectorControls);

// Save visual effect as a class
const addSaveprops = (extraProps, blockType, attributes) => {
    let className = extraProps.className || '';
    if (attributes.visualEffect) {
        className += ` ${attributes.visualEffect}`;
    }
    if (attributes.fadeInWords) {
        className += ' fade-in-words';
    }
    return {
        ...extraProps,
        className: className.trim(),
    };
};
addFilter('blocks.getSaveContent.extraProps', 'nmbe/addSaveprops', addSaveprops);
