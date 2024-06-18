import React, { Component, createRef } from 'react';

const defaultPercent = 1;
// 进度条背景色
const progressBackgroundColor = '#F4F4F4';
// 进度条渐变色开始色
const progressStartColor = '#0089E4';
// 进度条渐变色结束色
const progressEndColor = '#004EB2';
// 进度条开始的位置，根据UI图确定，从3*PI/2处开始顺时针画
const defaultAngle = (Math.PI * 3) / 2;

interface ProgressProps {
    percent: number;
    radius: number;
    borderWidth: number;
}
export default class MaxProgress extends Component<ProgressProps> {
    progressCanvas: any;
    constructor(props) {
        super(props);
        this.progressCanvas = createRef();
    }

    async componentDidMount() {
        const context = await this.getcontext();
        this.draw(context);
    }
    getcontext = async () => {
        const context = await this.progressCanvas.current?.getContext();
        return context;
    };

    draw = async (ctx) => {
        // 进度条的百分比
        const percent = this.props.percent || defaultPercent;
        const { radius, borderWidth } = this.props;

        const circleObj = {
            ctx,
            /* 圆心 */
            x: radius,
            y: radius,
            /* 半径 */
            radius: radius - borderWidth, // 内圈半径
            /* 环的宽度 */
            lineWidth: borderWidth,
            color: progressBackgroundColor,
            startAngle: 0,
            endAngle: Math.PI * 2,
        };
        /* 背景圆环 */
        // 背景圆环开始的位置比有色圆环结束的位置少一个相位保证闭环
        circleObj.startAngle = defaultAngle + Math.PI * 2 * percent - Math.PI * 2;
        // 背景圆环结束的位置为有色环开始的位置
        circleObj.endAngle = defaultAngle;
        circleObj.color = progressBackgroundColor;
        this.drawCircle(circleObj);

        /* 有色圆环 */
        /* 开始的度数根据UI图确定，从3*PI/2处开始顺时针画 */
        circleObj.startAngle = defaultAngle;
        /* 结束的度数 开始的度数+进度条的度数 */
        circleObj.endAngle = circleObj.startAngle + Math.PI * 2 * percent;
        // 设置渐变色的渐变规律
        const grd = await ctx.createLinearGradient(radius, 0, 0, 0);
        grd.addColorStop(0, progressStartColor);
        grd.addColorStop(1, progressEndColor);

        circleObj.color = grd;
        this.drawCircle(circleObj);
    };

    /* 画曲线 */
    drawCircle = (circleObj) => {
        const { ctx } = circleObj;
        ctx.beginPath();
        ctx.arc(circleObj.x, circleObj.y, circleObj.radius, circleObj.startAngle, circleObj.endAngle, false);
        // 设定曲线粗细度
        ctx.lineWidth = circleObj.lineWidth;
        // 给曲线着色
        ctx.strokeStyle = circleObj.color;
        // 连接处样式
        ctx.lineCap = 'round';
        // 给环着色
        ctx.stroke();
        ctx.closePath();
    };

    render() {
        // 将画布的宽高设置为直径的长度。
        const width = this.props.radius * 2;
        const height = this.props.radius * 2;
        const  Canvas=document.querySelector('#canvas');
        return <Canvas width={width} height={height} ref={this.progressCanvas} />;
    }
}
