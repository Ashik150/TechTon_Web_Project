import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import styles from '../../styles/styles'
import EventCard from "./EventCard";
import { useDispatch } from 'react-redux';
import { getAllEvents } from '../../redux/actions/event';

const Events = () => {
  const {allEvents,isLoading} = useSelector((state) => state.events);  
  const dispatch = useDispatch();
  
  console.log("All Events are", allEvents);

  useEffect(() => {
    dispatch(getAllEvents());
