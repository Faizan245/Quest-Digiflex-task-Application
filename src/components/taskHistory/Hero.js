import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { RiCloseLargeLine } from "react-icons/ri";
import { useSelector } from 'react-redux';
const Hero = () => {
    const [tasks, setTasks] = useState([])

    const [showPopUpDetail, setShowPopUpDetail] = useState(false);
    const [employeeName, setEmployeeName] = useState('');
    const [employeeId, setEmployeeId] = useState('');
    const [taskId, setTaskId] = useState('')
    const [taskDetails, setTaskDetails] = useState('');
    const [status, setStatus] = useState('');
    const [newStatus, setNewStatus] = useState('');
    const [documents, setDocuments] = useState([]);
    const [files, setFiles] = useState([]);
    const [uploadMessage, setUploadMessage] = useState('');
    const api = process.env.REACT_APP_API_ENDPOINT;

    
    const userStatus = useSelector((state) => state.auth.user.status);
    const userId = useSelector((state) => state.auth.user.userId);
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get(`${api}/taskHistory`);
                if (response.status === 200) {
                    const taskHistory = response.data.taskHistory;
    
                    if (userStatus === 'owner') {
                        // If the status is 'owner', add all tasks
                        setTasks(taskHistory);
                    } else if (userStatus === 'employee') {
                        // If the status is 'employee', filter tasks by employeeId
                        const filteredTasks = taskHistory.filter(task => task.employeeId === userId);
                        setTasks(filteredTasks);
                    }
                }
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };
    
        fetchTasks();
    }, [api, userStatus, userId]);
    

    const handleClosetask = () => {
        setStatus('')
        setNewStatus('')
        setShowPopUpDetail(false);
        setTaskId('')
        setFiles([])
        setDocuments('')
    }


    const statusStage = ["Beginning", "Under Work", "Done"];
    const [currentIndex, setCurrentIndex] = useState(-1);

    const changeStatus = () => {
        const newIndex = (currentIndex + 1) % statusStage.length;
        setCurrentIndex(newIndex);
        setNewStatus(statusStage[newIndex]);
    };

    const handleDetailsClick = (task) => {
        setShowPopUpDetail(true);
        setEmployeeId(task.employeeId);
        setEmployeeName(task.employeeName);
        setTaskDetails(task.taskDetails);
        setStatus(task.status);
        setNewStatus(task.status);
        setTaskId(task.id)
        setDocuments(Array.isArray(task.documentURLs) ? task.documentURLs : []);
    }


    const handleDocClick = (url) => {
        window.open(url, '_blank'); // Open the document in a new tab
    };

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        setFiles(prevDocuments => [...prevDocuments, ...selectedFiles]);
        setUploadMessage(`${files.length + 1} file(s) uploaded`);

        console.log('files:', [...files, ...selectedFiles]); // Debugging line
    };


    const handleSave = async () => {

        const formData = new FormData();
        formData.append('status', newStatus);
        formData.append('taskId', taskId);
        documents.forEach((document) => {
            formData.append('files', document);
        });

        console.log(formData)
    };
    return (
        <>
            <h1 className='text-[32px] max-lg:text-[24px] max-sm:text-[16px] font-bold pl-[100px] max-lg:pl-5 pt-[5px]'>Task History</h1>
            <div className='w-full h-full flex flex-wrap justify-center gap-10 max-lg:gap-3 px-[20px] pt-[20px] text-[18px]'>
                {tasks.map((task, index) => (
                    <div key={index} className='w-[400px] max-lg:w-[350px] max-sm:w-[300px] shadow-lg rounded-[30px] flex justify-between items-center p-8 max-lg:p-4'>
                        <div className='w-full max-lg:text-[14px]'>
                            <h1><span className='font-semibold'>Task Details :</span> {task.taskDetails}</h1>
                            <h1><span className='font-semibold'>Employee Name :</span> {task.employeeName}</h1>
                            <h1 className='tracking-tighter'><span className='font-semibold'>Employee ID :</span> {task.employeeId}</h1>
                        </div>
                        <div className=''>
                            <button onClick={() => handleDetailsClick(task)} className='bg-custom-gradient px-[20px] py-[2px] text-[#fff] text-[14px] rounded-lg'>detail</button>
                            {showPopUpDetail && (
                                <div className='fixed w-full h-screen top-[0px] bottom-[0px] left-[0px] right-[0px] bg-black bg-opacity-20 flex justify-center items-center'>
                                    <div className='w-[450px] h-[650px] rounded-3xl bg-[#f0f0f0] relative'>
                                        <div onClick={handleClosetask} className='absolute top-[5%] right-[5%]'>
                                            <RiCloseLargeLine className='text-[20px]' />
                                        </div>
                                        <div className='w-full h-full flex flex-col items-center py-[50px]'>
                                            <div className='text-center flex flex-col gap-2'>
                                                <h1><span className='font-bold'>Employee Name : </span>{employeeName}</h1>
                                                <h1><span className='font-bold'>Employee ID : </span>{employeeId}</h1>
                                                <h1><span className='font-bold'>Task Details : </span>{taskDetails}</h1>
                                                <h1><span className='font-bold'>Task Status : </span>{currentIndex === -1 ? status : statusStage[currentIndex]}</h1>
                                                <div className='flex flex-col px-[10px] h-[300px] overflow-scroll'>
                                                    {Array.isArray(documents) && documents.length > 0 ? (
                                                        documents.map((doc, index) => (
                                                            <div
                                                                key={index}
                                                                onClick={() => handleDocClick(doc.url)}
                                                                className='cursor-pointer rounded-2xl p-[20px] bg-[#fff] border border-[#ccc] mb-[10px] inline-block'
                                                            >
                                                                {doc.name}
                                                            </div>
                                                        ))
                                                    ) : (
                                                        <p>Loading documents...</p>
                                                    )}
                                                </div>
                                                <label className="inline-block bg-[#D9D9D9] text-black text-[18px] max-md:text-[16px] font-medium py-2 px-4 rounded-xl cursor-pointer">
                                                    Pick Documents
                                                    <input
                                                        type="file"
                                                        multiple
                                                        onChange={handleFileChange}
                                                        className="hidden"
                                                    />
                                                </label>
                                                {uploadMessage && (
                                                    <div className=" text-green-600">
                                                        {uploadMessage}
                                                    </div>
                                                )}
                                            </div>
                                            <div className='flex gap-10 absolute bottom-[3%] font-semibold'>
                                                <button onClick={handleSave} className='bg-custom-gradient rounded-lg py-[10px] px-[30px] text-[#fff] text-[20px]'>Save</button>
                                                <button onClick={changeStatus} className='bg-custom-gradient rounded-lg py-[10px] px-[30px] text-[#fff] text-[20px]'> Change Status</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {/* <button className='bg-custom-gradient px-[20px] py-[2px] text-[#fff] text-[14px] rounded-lg'>Chat</button> */}
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Hero