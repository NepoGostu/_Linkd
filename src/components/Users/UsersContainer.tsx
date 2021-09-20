import React, {Component, ComponentType} from 'react';
import {connect} from 'react-redux';
import {
    follow,
    FollowingInProgressType,
    getUsers,
    InitialStateTypeToUsers,
    setCurrentPage,
    toggleFollowingInProgress,
    unfollow
} from '../../redux/users-reducer';
import {AppStateType} from '../../redux/redux-store';
import Users from './Users';
import Preloader from '../common/preloader/Preloader';
import {withAuthRedirect} from '../../hoc/withAuthRedirect';
import {compose} from 'redux';

type MapDispatchPropsType = {
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setCurrentPage: (pageNumber: number) => void
    toggleFollowingInProgress: (isFetching: boolean, userId: number) => void
    getUsers: (currentPage: number, pageSize: number) => void

}

export type UsersPropsType = MapStatePropsType & MapDispatchPropsType

export class UsersContainer extends React.Component<UsersPropsType> {

    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize)
    }

    onPageChanged = (pageNumber: number) => {
        this.props.getUsers(pageNumber, this.props.pageSize)
    }

    render() {
        return <>
            {this.props.usersData.isFetching ?
                <Preloader/>
                : null}
            <Users
                onPageChanged={this.onPageChanged}
                follow={this.props.follow}
                unfollow={this.props.unfollow}
                setCurrentPage={this.props.setCurrentPage}
                usersData={this.props.usersData}
                toggleFollowingInProgress={this.props.toggleFollowingInProgress}
                followingInProgress={this.props.followingInProgress}
                currentPage={this.props.currentPage}
                isFetching={this.props.isFetching}
                totalUsersCount={this.props.totalUsersCount}
                pageSize={this.props.pageSize}
                getUsers={this.props.getUsers}
            />
        </>
    }
}

type MapStatePropsType = {
    usersData: InitialStateTypeToUsers
    pageSize: number
    currentPage: number
    totalUsersCount: number
    isFetching: boolean
    followingInProgress: Array<FollowingInProgressType>
    getUsers: any
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        usersData: state.usersData,
        pageSize: state.usersData.pageSize,
        currentPage: state.usersData.currentPage,
        totalUsersCount: state.usersData.totalUsersCount,
        isFetching: state.usersData.isFetching,
        followingInProgress: state.usersData.followingInProgress,
        getUsers: state.usersData.getUsers
    }
}

/*let withRedirect = withAuthRedirect(UsersContainer)

export default connect(mapStateToProps, {
    follow, unfollow, setCurrentPage, toggleFollowingInProgress, getUsers
})(withRedirect);*/

export default compose<ComponentType>(
    connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, {
        follow,
        unfollow,
        setCurrentPage,
        toggleFollowingInProgress,
        getUsers
    }),
    withAuthRedirect
)(UsersContainer)