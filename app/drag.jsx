import React from 'react';
import ReactDOM from 'react-dom';

import { Observable } from 'rxjs';

export default class Drag extends React.Component {
    state = {
        style: {
            width: '200px',
            height: '200px',
            background: 'red',
        },
    };
    componentDidMount() {
        const elem = ReactDOM.findDOMNode(this.drag);
        const mouseDown = Observable.fromEvent(elem, 'mousedown');
        const mouseMove = Observable.fromEvent(document, 'mousemove');
        const mouseUp = Observable.fromEvent(elem, 'mouseup');

        const mouseDrag = mouseDown.flatMap(md => {
            const startX = md.offsetX;
            const startY = md.offsetY;

            return mouseMove
                .map(mm => {
                    mm.preventDefault();

                    return {
                        left: mm.clientX - startX,
                        top: mm.clientY - startY,
                    };
                })
                .takeUntil(mouseUp);
        });

        this.dragSubscription$ = mouseDrag.subscribe(pos => {
            this.setState({
                style: {
                    top: pos.top + 'px',
                    left: pos.left + 'px',
                    width: '200px',
                    height: '200px',
                    background: 'red',
                    position: 'absolute',
                },
            });
        });
    }

    componentWillUnmount() {
        this.dragSubscription$.unsubscribe();
    }

    render() {
        return <div ref={ref => (this.drag = ref)} style={this.state.style} />;
    }
}
