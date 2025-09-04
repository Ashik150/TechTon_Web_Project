import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import styles from '../../styles/styles'
import EventCard from "./EventCard";
import { useDispatch } from 'react-redux';
import { getAllEvents } from '../../redux/actions/event';

const Events = () => {
