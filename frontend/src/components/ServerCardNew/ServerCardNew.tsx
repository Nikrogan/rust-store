import './style.css';

export const ServerCardNew = ({title = '', subTitle= '', ip= ''}) => {
    return (<div className='server-card'>
        <h4 className='server-card__title'>{title}</h4>
        <h5 className='server-card__subtitle'>{subTitle}</h5>
        <div className='server-card__ip'>{ip}</div>
    </div>)
}