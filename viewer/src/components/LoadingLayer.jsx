import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { TranslationContext } from "./Translation";
import styled from 'styled-components';

const DarkLayer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--alternative-background-color);
    opacity: 0.7;
`;

const MessageWrapper = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0.8;
    font-size: 5em;
    flex: 1 1 auto;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export default class LoadingLayer extends React.Component {
    static contextType = TranslationContext;

    constructor(props) {
        super(props);
        this.showTimeout = null;
        this.rootRef = React.createRef();
    }

    componentDidMount() {
        this.showTimeout = setTimeout(() => {
            if (this.rootRef.current) this.rootRef.current.style.display = null;
            this.showTimeout = null;
        }, 500);
    }

    componentWillUnmount() {
        this.showTimeout && clearTimeout(this.showTimeout);
    }

    render() {
        const t = this.context;

        return (
            <div
                style={{ display: 'none' }}
                ref={this.rootRef}
            >
                <DarkLayer />
                <MessageWrapper>
                    <FontAwesomeIcon
                        icon={faSpinner}
                        pulse={true}
                    />
                    <span style={{ marginLeft: '0.5em' }}>{t("Loading")}...</span>
                </MessageWrapper>
            </div>
        );
    }
}