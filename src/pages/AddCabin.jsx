import React, { useState } from "react";
import CabinTable from "../features/cabins/CabinTable";
import CreateCabinForm from "../features/cabins/CreateCabinForm";
import Button from "../ui/Button";
import Modal from "../ui/Modal";

function AddCabin(){
  return(
   <>
   <div>

    <Modal>
      <Modal.Open opens="cabin-form">
        <Button>Add new Cabin</Button>
      </Modal.Open>
        <Modal.Window name='cabin-form'>
          <CreateCabinForm />
        </Modal.Window>
    </Modal>
   </div>


    {/* <Modal>
      <Modal.Open opens='table'>
        <Button>Show all cabins</Button>
      </Modal.Open>
      <Modal.Window name='table'>
        <CabinTable />
      </Modal.Window>
    </Modal> */}
    </>
  )

}

// function AddCabin() {
//   const [openModal, setopenModal] = useState(false);
//   return (
//     <div>
//       <Button onClick={() => setopenModal((s) => !s)}>Add new Cabin</Button>
//       {openModal && (
//         <Modal closeModal={() => setopenModal(false)}>
//           <CreateCabinForm closeModal={()=>setopenModal(false)}/>
//         </Modal>
//       )}
//     </div>
//   );
// }

export default AddCabin;
