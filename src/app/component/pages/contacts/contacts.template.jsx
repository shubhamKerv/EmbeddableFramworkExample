import React from "react";
import UpDownIcon from "../../../../assets/icons/up-down.svg";
import { Table } from "../../molecules/table/table.component";

export default ({ columns, contacts, onClickContact }) => {
	return (
		<div style={{margin: '6rem 2rem 0 2rem'}}>
			<span>All Contacts</span>
			<Table columns={columns} data={contacts} onClickRowItem={onClickContact}/>
		</div>
	);
};