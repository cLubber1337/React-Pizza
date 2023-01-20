import React from 'react';
import {Pagination, PaginationItem, Stack,} from "@mui/material";
import style from "./Pagination.module.scss"
import {ArrowBackIosNewOutlined, ArrowForwardIosOutlined} from "@mui/icons-material";

type PaginationListType = {
    onChangePage: (number: number) => void
    currentPage: number
}

export const PaginationList: React.FC<PaginationListType> = ({onChangePage, currentPage}) => {
    return (
        <div className={style.root}>
            <Stack spacing={2}>
                <Pagination size={"large"}
                            variant="outlined"
                            color="secondary"
                            count={3}
                            page={currentPage}
                            onChange={(_, num)=> onChangePage(num)}
                            renderItem={(item) => (
                                <PaginationItem
                                    slots={{previous: ArrowBackIosNewOutlined, next: ArrowForwardIosOutlined}}
                                    {...item}
                                />
                            )}
                />
            </Stack>
        </div>
    );
};
