// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import Register from '../../create-employee/Register';
// import { RiCloseLargeLine } from "react-icons/ri";
// import axios from 'axios';

// function Hero() {
//     const [showPopUpReg, setShowPopUpReg] = useState(false);
//     const [showPopUpDetail, setShowPopUpDetail] = useState(false);
//     const [employeeName, setEmployeeName] = useState('');
//     const [employeeId, setEmployeeId] = useState('');
//     const [taskId, setTaskId] = useState('')
//     const [taskDetails, setTaskDetails] = useState('');
//     const [status, setStatus] = useState('');
//     const [newStatus, setNewStatus] = useState('');
//     const [tasks, setTasks] = useState([]);
//     const [documents, setDocuments] = useState([]);
//     // const [selectedFile, setSelectedFile] = useState(null);
//     const [files, setFiles] = useState([]);
//     const [refreshTasks, setRefreshTasks] = useState(false);
//     const [uploadMessage, setUploadMessage] = useState('');
//     const [isDeleting, setIsDeleting] = useState(false);
//     const api = process.env.REACT_APP_API_ENDPOINT;

//     useEffect(() => {
//         const fetchTasks = async () => {
//             try {
//                 const response = await axios.get(`${api}/tasks`);
//                 setTasks(response.data.tasks);
//             } catch (error) {
//                 console.error('Error fetching tasks:', error);
//             }
//         };

//         fetchTasks();
//         setRefreshTasks(false)
//     }, [refreshTasks, api]);

//     const handleCreateEmpClick = () => {
//         setShowPopUpReg(true);
//     }

//     const handleClose = () => {

//         setShowPopUpReg(false);

//     }
//     const handleClosetask = () => {
//         setStatus('')
//         setNewStatus('')
//         setShowPopUpDetail(false);
//         setTaskId('')
//         setFiles([])
//         setDocuments('')
//     }


//     const statusStage = ["Beginning", "Under Work", "Done"];
//     const [currentIndex, setCurrentIndex] = useState(-1);

//     const changeStatus = () => {
//         const newIndex = (currentIndex + 1) % statusStage.length;
//         setCurrentIndex(newIndex);
//         setNewStatus(statusStage[newIndex]);
//     };

//     const handleDetailsClick = (task) => {
//         setShowPopUpDetail(true);
//         setEmployeeId(task.employeeId);
//         setEmployeeName(task.employeeName);
//         setTaskDetails(task.taskDetails);
//         setStatus(task.status);
//         setNewStatus(task.status);
//         setTaskId(task.taskId)
//         setDocuments(Array.isArray(task.documentURLs) ? task.documentURLs : []);
//         console.log(task.documentURLs)
//     }


//     const handleDocClick = (url) => {
//         window.open(url, '_blank'); // Open the document in a new tab
//     };

//     const handleFileChange = (e) => {
//         const selectedFiles = Array.from(e.target.files);
//         setFiles(prevDocuments => [...prevDocuments, ...selectedFiles]);
//         setUploadMessage(`${files.length + 1} file(s) uploaded`);

//         console.log('files:', [...files, ...selectedFiles]); // Debugging line
//     };


//     const handleSave = async () => {

//         const formData = new FormData();
//         formData.append('newStatus', newStatus);
//         formData.append('taskId', taskId);
//         documents.forEach((document) => {
//             formData.append('files', document);
//         });
//         console.log('FormData entries:', [...formData.entries()]);

//         try {
//             const response = await axios.post(`${api}/updateTask`, formData);


//             if (response.status === 200) {
//                 console.log('Task updated successfully:', response.data);
//                 setNewStatus('');

//                 setRefreshTasks(true) 
//                 setShowPopUpDetail(false);// Close the details popup
//             } else {
//                 console.error('Task updation failed:', response.data);
//             }
//         } catch (error) {
//             console.error('Error:', error);
//         }
//     };
//     const handleDelete = async (taskId) => {
//         setIsDeleting(true);

//         try {
//           await axios.delete(`${api}/delete-task`, taskId);   
//           setShowPopUpDetail(false);


//         } catch (error) {
//           console.error('Error deleting task:', error);
//           // Handle error, e.g., display an error message
//         } finally {
//           setIsDeleting(false);
//         }
//       };


//     return (
//         <>
//             <div className='w-full h-full flex flex-col items-center'>
//                 <div className='w-[80%] max-sm:w-[95%] h-[70px] max-lg:h-[50px] mt-[15px] bg-custom-gradient rounded-2xl pl-[50px] max-sm:pl-5 flex items-center'>
//                     <h1 className='text-[#fff] text-[24px] max-lg:text-[20px] font-bold'>Tasks</h1>
//                 </div>
//                 <div className='flex gap-10 max-lg:gap-5'>
//                     <div onClick={handleCreateEmpClick} className=' py-[10px] max-lg:py-[5px] px-[30px] max-lg:px-[15px] text-[#fff] mt-[10px] bg-custom-gradient rounded-2xl max-lg:rounded-xl flex items-center justify-center'>
//                         <h1 className='text-[20px] max-lg:text-[16px] font-semibold'>Create Employee</h1>
//                     </div>
//                     <div className=' py-[10px] max-lg:py-[5px] px-[30px] max-lg:px-[15px] text-[#fff] mt-[10px] bg-custom-gradient rounded-2xl max-lg:rounded-xl flex items-center justify-center'>
//                         <Link to='/create-task'><h1 className='text-[20px] max-lg:text-[16px] font-semibold'>Create Task</h1></Link>
//                     </div>
//                 </div>
//             </div>
//             {showPopUpReg && (
//                 <div className='fixed w-full h-screen top-[0px] bottom-[0px] left-[0px] right-[0px] bg-black bg-opacity-50 flex justify-center items-center'>
//                     <Register />
//                     <div onClick={handleClose} className='absolute top-[40px] left-[63%] max-lg:left-[67%] max-md:left-[75%]'>
//                         <RiCloseLargeLine className='text-[20px]' />
//                     </div>
//                 </div>
//             )}
//             <div className='w-full flex flex-col gap-5 pt-[20px] pb-[50px]'>
//                 <h1 className='font-semibold text-[20px] max-md:text-[16px] pl-[50px] max-xl:pl-[150px] max-lg:pl-[50px] max-sm:pl-5 text-[#C2C3CC]'>Ongoing task</h1>
//                 <div className='flex flex-wrap gap-[50px] max-md:gap-[40px] px-[100px] max-lg:px-[20px] gap-y-[50px] max-sm:gap-y-5 justify-center'>
//                     {tasks.map((task, index) => (
//                         <div key={index} className="w-[400px] max-md:w-[320px] flex gap-5 rounded-[25px] max-xl:rounded-[20px] shadow-2xl p-[30px] max-xl:p-[20px]">
//                             {/* <div className='w-[100px] h-[100px] max-xl:w-[80px] max-xl:h-[80px] rounded-xl bg-[#C4C4C4]'></div> */}
//                             <div className='flex items-center gap-10 w-full justify-between'>
//                                 <div>
//                                     <h1 className='font-semibold text-[20px] max-xl:text-[18px] max-sm:text-[16px]'>{task.employeeName}</h1>
//                                     <p className='text-[18px] max-xl:text-[16px] text-[#C4C4C4]'>Task : {task.taskDetails}</p>
//                                 </div>
//                                 <div className=''>
//                                     <button onClick={() => handleDetailsClick(task)} className='bg-custom-gradient px-[20px] py-[3px] text-[#fff] text-[16px] rounded-lg'>Details</button>
//                                     {showPopUpDetail && (
//                                         <div className='fixed w-full h-screen top-[0px] bottom-[0px] left-[0px] right-[0px] bg-black bg-opacity-20 flex justify-center items-center'>
//                                             <div className='w-[450px] h-[650px] rounded-3xl bg-[#f0f0f0] relative'>
//                                                 <div onClick={handleClosetask} className='absolute top-[5%] right-[5%]'>
//                                                     <RiCloseLargeLine className='text-[20px]' />
//                                                 </div>
//                                                 <div className='w-full h-full flex flex-col items-center py-[50px]'>
//                                                     <div className='text-center flex flex-col gap-2'>
//                                                         <h1><span className='font-bold'>Employee Name : </span>{employeeName}</h1>
//                                                         <h1><span className='font-bold'>Employee ID : </span>{employeeId}</h1>
//                                                         <h1><span className='font-bold'>Task Details : </span>{taskDetails}</h1>
//                                                         <h1><span className='font-bold'>Task Status : </span>{currentIndex === -1 ? status : statusStage[currentIndex]}</h1>
//                                                         <div className='flex flex-col px-[10px] h-[300px] overflow-scroll'>
//                                                             {Array.isArray(documents) && documents.length > 0 ? (
//                                                                 documents.map((doc, index) => {
//                                                                     // Extract the file name from the URL
//                                                                     const fileName = doc.split('/').pop();
//                                                                     return (
//                                                                         <div
//                                                                             key={index}
//                                                                             onClick={() => handleDocClick(doc)} // Pass the URL directly
//                                                                             className='cursor-pointer rounded-2xl p-[20px] bg-[#fff] border border-[#ccc] mb-[10px] inline-block'
//                                                                         >
//                                                                             {fileName} {/* Display only the file name */}
//                                                                         </div>
//                                                                     );
//                                                                 })
//                                                             ) : (
//                                                                 <p>Loading documents...</p>
//                                                             )}
//                                                         </div>

//                                                         <label className="inline-block bg-[#D9D9D9] text-black text-[18px] max-md:text-[16px] font-medium py-2 px-4 rounded-xl cursor-pointer">
//                                                             Pick Documents
//                                                             <input
//                                                                 type="file"
//                                                                 multiple
//                                                                 onChange={handleFileChange}
//                                                                 className="hidden"
//                                                             />
//                                                         </label>
//                                                         {uploadMessage && (
//                                                             <div className=" text-green-600">
//                                                                 {uploadMessage}
//                                                             </div>
//                                                         )}
//                                                     </div>
//                                                     <div className='flex gap-5 absolute bottom-[6%] font-semibold'>
//                                                         <button onClick={handleSave} className='bg-custom-gradient rounded-lg py-1 px-3 text-[#fff] hover:text-black text-[20px]'>Save</button>
//                                                         <button onClick={changeStatus} className='bg-custom-gradient rounded-lg py-1 px-3 text-[#fff] hover:text-black text-[20px]'> Change Status</button>
//                                                         <button disabled={isDeleting} onClick={handleDelete(task.taskId)} className='bg-custom-gradient rounded-lg py-1 px-3 text-[#fff] hover:text-black text-[20px]'>Delete Task</button>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     )}
//                                     {/* <button className='bg-custom-gradient px-[20px] py-[2px] text-[#fff] text-[14px] rounded-lg'>Chat</button> */}
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </>
//     );
// }

// export default Hero;


import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Register from '../../create-employee/Register';
import { RiCloseLargeLine } from "react-icons/ri";
import { FaSearch } from "react-icons/fa";
import axios from 'axios';

function Hero() {
    const [showPopUpReg, setShowPopUpReg] = useState(false);
    const [showPopUpDetail, setShowPopUpDetail] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [files, setFiles] = useState([]);
    const [uploadMessage, setUploadMessage] = useState('');
    const [documents, setDocuments] = useState([]);
    const [refreshTasks, setRefreshTasks] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const api = process.env.REACT_APP_API_ENDPOINT;
    const [searchQuery, setSearchQuery] = useState('');

    const statusStage = ["Beginning", "Under Work", "Done"];
    const [currentIndex, setCurrentIndex] = useState(-1);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get(`${api}/tasks`);
                setTasks(response.data.tasks);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };

        fetchTasks();
        setRefreshTasks(false);
    }, [refreshTasks, api]);

    const filteredEmployees = tasks.filter(task =>
        task.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.taskDetails.toLowerCase().includes(searchQuery.toLowerCase())

    );

    const handleDocClick = (url) => {
        window.open(url, '_blank'); // Open the document in a new tab
    };

    const handleCreateEmpClick = () => {
        setShowPopUpReg(true);
    };

    const handleClose = () => {
        setShowPopUpReg(false);
    };

    const handleClosetask = () => {
        setSelectedTask(null);
        setShowPopUpDetail(false);
        setFiles([]);
        setUploadMessage('');
        setCurrentIndex(-1);
    };

    const handleDetailsClick = (task) => {
        setSelectedTask(task);
        setDocuments(Array.isArray(task.documentURLs) ? task.documentURLs : []);
        setShowPopUpDetail(true);
    };

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
        setUploadMessage(`${files.length + selectedFiles.length} file(s) uploaded`);
    };

    const changeStatus = () => {
        const newIndex = (currentIndex + 1) % statusStage.length;
        setCurrentIndex(newIndex);
    };

    const handleSave = async () => {
        if (!selectedTask) return;

        const formData = new FormData();
        formData.append('newStatus', currentIndex === -1 ? selectedTask.status : statusStage[currentIndex]);
        formData.append('taskId', selectedTask.taskId);
        files.forEach((file) => {
            formData.append('files', file);
        });

        try {
            const response = await axios.post(`${api}/updateTask`, formData);
            if (response.status === 200) {
                console.log('Task updated successfully:', response.data);
                setRefreshTasks(true);
                handleClosetask(); // Close popup
            } else {
                console.error('Task updation failed:', response.data);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleDelete = async (taskId) => {
        if (!taskId) {
            console.error('Task ID is missing or invalid');
            return;
        }

        setIsDeleting(true);

        try {
            console.log('Task ID being deleted:', taskId);
            const response = await axios.delete(`${api}/delete-task`, {
                data: { taskId }, // Pass body data using the `data` field
            });
            console.log('Delete response:', response.data);
            setRefreshTasks(true);
            handleClosetask();
        } catch (error) {
            console.error('Error deleting task:', error.response ? error.response.data : error.message);
        } finally {
            setIsDeleting(false);
        }
    };


    return (
        <>
            <div className='w-full h-full flex flex-col items-center'>
                {/* <div className='w-[80%] max-sm:w-[95%] h-[70px] max-lg:h-[50px] mt-[15px] bg-custom-gradient rounded-2xl pl-[50px] max-sm:pl-5 flex items-center'>
                    <h1 className='text-[#fff] text-[24px] max-lg:text-[20px] font-bold'>Tasks</h1>
                </div> */}
                <div className='w-[50%] max-sm:w-[90%] flex items-center pt-5 z-[-1] relative'>
                    <input
                        type='text'
                        placeholder='Search : "Employee Name" or "Task"'
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className='w-full py-[10px] max-lg:text-[14px] pl-[30px] max-md:pl-[10px] border border-[#FAC8A2] rounded-2xl'
                    />
                    <FaSearch className='text-[22px] max-lg:text-[18px] text-[#F59245] absolute right-[0px] mr-[30px] max-md:mr-[10px]' />
                </div>
                <div className='flex gap-10 max-lg:gap-5'>
                    <div onClick={handleCreateEmpClick} className='py-[10px] max-lg:py-[5px] px-[30px] max-lg:px-[15px] text-[#fff] mt-[10px] bg-custom-gradient rounded-2xl max-lg:rounded-xl flex items-center justify-center'>
                        <h1 className='text-[20px] max-lg:text-[16px] font-semibold'>Create Employee</h1>
                    </div>
                    <div className='py-[10px] max-lg:py-[5px] px-[30px] max-lg:px-[15px] text-[#fff] mt-[10px] bg-custom-gradient rounded-2xl max-lg:rounded-xl flex items-center justify-center'>
                        <Link to='/create-task'><h1 className='text-[20px] max-lg:text-[16px] font-semibold'>Create Task</h1></Link>
                    </div>
                </div>
            </div>

            {showPopUpReg && (
                <div className='fixed w-full h-screen top-[0px] bottom-[0px] left-[0px] right-[0px] bg-black bg-opacity-50 flex justify-center items-center'>
                    <Register />
                    <div onClick={handleClose} className='absolute top-[40px] left-[63%] max-lg:left-[67%] max-md:left-[75%]'>
                        <RiCloseLargeLine className='text-[20px]' />
                    </div>
                </div>
            )}

            <div className='w-full flex flex-col gap-5 pt-[20px] pb-[50px]'>
                <h1 className='font-semibold text-[20px] max-md:text-[16px] pl-[50px] max-xl:pl-[150px] max-lg:pl-[50px] max-sm:pl-5 text-[#C2C3CC]'>Ongoing task</h1>
                <div className='flex flex-wrap gap-[50px] max-md:gap-[40px] px-[100px] max-lg:px-[20px] gap-y-[50px] max-sm:gap-y-5 justify-center'>
                {(searchQuery ? filteredEmployees : tasks).map((task, index) => (
                        <div key={index} className="w-[400px] border max-md:w-[320px] flex gap-5 rounded-[25px] max-xl:rounded-[20px] shadow-2xl p-[30px] max-xl:p-[20px]">
                            <div className='flex items-center gap-10 w-full justify-between'>
                                <div>
                                    <h1 className='font-semibold text-[20px] max-xl:text-[18px] max-sm:text-[16px]'>{task.employeeName}</h1>
                                    <p className='text-[18px] max-xl:text-[16px] text-[#C4C4C4]'>Task : {task.taskDetails}</p>
                                </div>
                                <div>
                                    <button onClick={() => handleDetailsClick(task)} className='bg-custom-gradient px-[20px] py-[3px] text-[#fff] text-[16px] rounded-lg'>Details</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {showPopUpDetail && selectedTask && (
                <div className='fixed w-full h-screen top-[0px] bottom-[0px] left-[0px] right-[0px] bg-black bg-opacity-20 flex justify-center items-center'>
                    <div className='w-[450px] max-sm:w-full h-[650px] rounded-3xl bg-[#f0f0f0] relative'>
                        <div onClick={handleClosetask} className='absolute top-[5%] right-[5%]'>
                            <RiCloseLargeLine className='text-[20px]' />
                        </div>
                        <div className='w-full h-full flex flex-col items-center py-[50px] px-5'>
                            <h1><span className='font-bold'>Employee Name : </span>{selectedTask.employeeName}</h1>
                            <h1><span className='font-bold'>Employee ID : </span>{selectedTask.employeeId}</h1>
                            <h1><span className='font-bold'>Task Details : </span>{selectedTask.taskDetails}</h1>
                            <h1><span className='font-bold'>Task Status : </span>{currentIndex === -1 ? selectedTask.status : statusStage[currentIndex]}</h1>
                            <div className='flex flex-col px-[10px] h-[350px] max-sm:w-full max-sm:px-0 overflow-scroll overflow-x-hidden'>
                                {Array.isArray(documents) && documents.length > 0 ? (
                                    documents.map((doc, index) => {
                                        // Extract the file name from the URL
                                        const fileName = doc.split('/').pop();
                                        return (
                                            <div
                                                key={index}
                                                onClick={() => handleDocClick(doc)} // Pass the URL directly
                                                className='cursor-pointer rounded-2xl p-[20px] bg-[#fff] border border-[#ccc] mb-[10px] inline-block'
                                            >
                                                {fileName} {/* Display only the file name */}
                                            </div>
                                        );
                                    })
                                ) : (
                                    <p>Loading documents...</p>
                                )}
                            </div>
                            <label className="inline-block bg-[#D9D9D9] text-black text-[18px] font-medium py-2 px-4 rounded-xl cursor-pointer">
                                Pick Documents
                                <input type="file" multiple onChange={handleFileChange} className="hidden" />
                            </label>
                            {uploadMessage && <div className="text-green-600">{uploadMessage}</div>}
                            <div className='flex gap-5 absolute bottom-[6%] font-semibold'>
                                <button onClick={handleSave} className='bg-custom-gradient rounded-lg py-1 px-3 text-[#fff] hover:text-black text-[20px] max-sm:text-[16px]'>Save</button>
                                <button onClick={changeStatus} className='bg-custom-gradient rounded-lg py-1 px-3 text-[#fff] hover:text-black text-[20px] max-sm:text-[16px]'>Change Status</button>
                                <button
                                    onClick={() => handleDelete(selectedTask.taskId)}
                                    className='bg-custom-gradient rounded-lg py-1 px-3 text-[#fff] hover:text-black text-[20px] max-sm:text-[16px]'
                                    disabled={isDeleting}
                                >
                                    {isDeleting ? 'Deleting...' : 'Delete'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Hero;
