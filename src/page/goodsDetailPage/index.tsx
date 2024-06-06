import { PureComponent, ReactNode } from "react";
import React from 'react'
import { connect } from "react-redux";
import { initGoodsDetailPage } from "../../store/actions/goodsDetailPage";
import { productItemInterface } from "../../interface/productInterface";
import NavigationBar from "../../components/navigationBar";
import { IMAGE_PATH } from "../../config/imageConfig";
import style from './index.module.scss'

interface Props{
    initGoodsDetailPage:(productId:string)=>void;
    product:productItemInterface
}
export class GoodsDetailPage extends PureComponent<Props>{
    constructor(props){
        super(props)
        this.props.initGoodsDetailPage(this.props.match.params?.productId)
    }
    render(): ReactNode {
        const {product}=this.props;
        if(!product){
            return <div/>
        }
        const{productName,imgAddr,productDesc,normalPrice,promotionPrice,productImgList}=product;
        return (
            <div>
                <NavigationBar title={productName} />
                <div className='common-page-container'>
                    <div className='title-text' >{productName}</div>
                    <div className={style.card}>
                        <div className={style.headerImage}>
                            <img src={IMAGE_PATH+imgAddr}/>
                        </div>
                        <div className={style.headContentContainer}>
                            <div className={style.itemContainer}>
                                <div className={style.title}>原价</div>
                                <del className={style.originalPrice}>¥{normalPrice }</del>
                            </div>
                            <div className={style.itemContainer}>
                                <div className={style.title}>促销价</div>
                                <span className={style.discountPrice}>¥{promotionPrice }</span>
                            </div>
                            <div className={style.itemContainer}>
                                <div className={style.title}>商品详情</div>
                                <span>{productDesc }</span>
                            </div>
                        </div>
                    </div>
                    <div className={style.card}>
                        <span className={style.detailTitle}>商品详情图片</span>
                        <div className={style.detailImages}>
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
                </div>
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    const{goodsDetailPageReducer:{goodsDetailPageData:{product={}}={}}={}}=state;
    return{product}
}
const mapDispatchToProps=(dispatch)=>{
    return{
        initGoodsDetailPage:(productId:string)=>dispatch(initGoodsDetailPage({productId:productId}))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(GoodsDetailPage)