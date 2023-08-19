import { PureComponent, ReactNode } from "react";
import React from 'react'
import { connect } from "react-redux";
import { initGoodsDetailPage } from "../store/actions/goodsDetailPage";
import { productItemInterface } from "../interface/productInterface";
import NavigationBar from "../components/navigationBar";
import { IMAGE_PATH } from "../config/imageConfig";

interface Props{
    initGoodsDetailPage:()=>void;
    product:productItemInterface
}
export class GoodsDetailPage extends PureComponent<Props>{
    constructor(props){
        super(props)
        this.props.initGoodsDetailPage()
    }
    render(): ReactNode {
        console.log('===33===='+JSON.stringify(this.props))
        const {product}=this.props;
        if(!product){
            return <div/>
        }
        const{productName,imgAddr,productDesc,normalPrice,promotionPrice,productImgList}=product;
        return (
            <div>
                <NavigationBar title={productName}/>
                <img
                src={IMAGE_PATH+imgAddr}
                />
                <div>
                    <span>￥</span>
                    <span>{normalPrice}</span>
                </div>
                <div>
                    <span>￥</span>
                    <span>{promotionPrice}</span>
                </div>
                <span>{productDesc}</span>
                <span>goods detail page</span>
                <span>更多房间图片</span>
                <div>
                    {productImgList&&productImgList.length>0&&productImgList.map((item,index)=>{
                        const imgPath=IMAGE_PATH+item.imgAddr;
                        return(
                            <img 
                            src={imgPath}
                            key={index}
                            />
                        )
                    })}
                </div>

            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    console.log('======='+JSON.stringify(state))
    const{goodsDetailPageReducer:{goodsDetailPageData:{product={}}={}}={}}=state;
    return{product}
}
const mapDispatchToProps=(dispatch)=>{
    return{
        initGoodsDetailPage:()=>dispatch(initGoodsDetailPage())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(GoodsDetailPage)