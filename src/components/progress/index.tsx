import React, { Component, createRef } from 'react';

const defaultPercent = 1;
const progressBackgroundColor = '#F4F4F4';
const progressStartColor = '#df5e5e';
const progressEndColor =  '#e08383';
const defaultAngle = (Math.PI * 3) / 2;

interface ProgressProps {
    percent: number;
    radius: number;
    borderWidth: number;
}

export default class Progress extends Component<ProgressProps> {
    progressCanvas = createRef<HTMLCanvasElement>();

    componentDidMount() {
        const context = this.getcontext();
        this.draw(context);
    }

    getcontext() {
        return this.progressCanvas.current?.getContext('2d');
    }

    draw(ctx) {
        const percent = this.props.percent || defaultPercent;
        const { radius, borderWidth } = this.props;

        const circleObj = {
            ctx,
            x: radius,
            y: radius,
            radius: radius - borderWidth,
            lineWidth: borderWidth,
            color: progressBackgroundColor,
            startAngle: 0,
            endAngle: Math.PI * 2,
        };

        circleObj.startAngle = defaultAngle + Math.PI * 2 * percent - Math.PI * 2;
        circleObj.endAngle = defaultAngle;
        circleObj.color = progressBackgroundColor;
        this.drawCircle(circleObj);

        circleObj.startAngle = defaultAngle;
        circleObj.endAngle = circleObj.startAngle + Math.PI * 2 * percent;

        const grd = ctx.createLinearGradient(0, 0, radius * 2, 0);
        grd.addColorStop(0, progressStartColor);
        grd.addColorStop(1, progressEndColor);

        circleObj.color = grd;
        this.drawCircle(circleObj);
    }

    drawCircle(circleObj) {
        const { ctx, x, y, radius, startAngle, endAngle, lineWidth, color } = circleObj;
        ctx.beginPath();
        ctx.arc(x, y, radius, startAngle, endAngle, false);
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = color;
        ctx.lineCap = 'round';
        ctx.stroke();
        ctx.closePath();
    }

    render() {
        const width = this.props.radius * 2;
        const height = this.props.radius * 2;
        return <canvas width={width} height={height} ref={this.progressCanvas} />;
    }
}
