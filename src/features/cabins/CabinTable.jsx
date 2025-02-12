import React from "react";
import CabinRow from "./CabinRow";
import Spinner from "../../ui/Spinner";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import  Menus  from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";


function CabinTable() {
  const { cabins, isLoading, error } = useCabins();
  const [searchParams] = useSearchParams();
  

  const discountType = searchParams.get("discount") || "all";

  let filterdCabins;

  if(discountType === "all") filterdCabins = cabins;
  if(discountType === 'no-discount') {
    filterdCabins = cabins.filter((cabin)=>cabin.discount === 0)
  }
  if(discountType === 'with-discount') {
    filterdCabins = cabins.filter((cabin)=>cabin.discount > 0)
  }

  const sortBy = searchParams.get('sortBy') || "startDate-asc";

  const[field , direction] = sortBy.split('-');

  const modifier = direction === 'asc' ? 1 : -1;
  const sortdCabins =filterdCabins ? filterdCabins.sort((a,b)=>(a[field] - b[field])*modifier ) : []



  if (isLoading) return <Spinner />;

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header role="row">
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={sortdCabins || {}}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
