import React from 'react';
import styles from './Users.module.css';
import userPhoto from '../../assest/image/78-786207_user-avatar-png-user-avatar-icon-png-transparent.jpg';
import {UsersPropsType} from './UsersContainer';
import {NavLink} from 'react-router-dom';

type  PropsType = {
    onPageChanged: (pageNumber: number) => void
}
let Users = (props: UsersPropsType & PropsType) => {

    let pagesCount = props.totalUsersCount / props.pageSize;
    let pages = [];
    for (let i = 0; i < pagesCount; i++) {
        pages.push(i);
    }

    return <div>
        <div>
            {pages.map(p => {
                return <span className={props.currentPage === p ? styles.selectedPage : ''}
                             onClick={(e) => {
                                 props.onPageChanged(p)
                             }}>{p}</span>
            })}
        </div>
        {
            props.usersData.map(u => <div key={u.id}>
        <span>
            <div>
                <NavLink to={'/profile/' + u.id}>
                      <img src={u.photos.small ? u.photos.small : userPhoto} className={styles.userPhoto}/>
                </NavLink>
            </div>
            <div>
                {u.followed
                    ? <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => {
                        props.unfollow(u.id)
                    }}>Unfollow</button>
                    : <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => {
                        props.follow(u.id)
                    }}>Follow</button>}
            </div>

        </span>
                <span>
<span>
    <div>{u.name}</div><div>{u.status}</div>
</span>
<span>
    <div>{'u.location.country'}</div>
    <div>{'u.location.city'}</div>
</span>
        </span>
            </div>)
        }
    </div>
}

export default Users