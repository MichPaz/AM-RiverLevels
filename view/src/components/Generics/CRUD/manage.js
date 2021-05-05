import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import PageHeader from '../PageHeader'
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux'

import OrderedTable from '../Tables/OrderedTable'
import LoadingTable from '../Loading/loadingTable'
import ButtonAtomic from '../Atomics/ButtonAtomic'
import {
    Grid, Hidden
} from '@material-ui/core'
import Pagination, { LimitPagination } from '../Pagination'
import InputSearch from '../Atomics/InputSearch'
import MobileList from '../Mobile/MobileList'


const Manage = (props) => {
    const permissions = useSelector(state => state.servicos)

    let history = useHistory();
    const {
        stores,
        formatData,
        formatDataMobile,
        actions,
        config,
        Restore,
    } = props

    const {
        headerTable,
        route,
        header,
        methods,
        hasSearch,
        hasAdd,
    } = config

    const restore = stores.getToRestore()

    //config modals 
    let modalInit = {}
    for (const method of methods) {
        modalInit[method.name] = false
    }

    let { method, id } = useParams();

    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(stores.getLimit())
    const [search, setSearch] = useState('')

    const [count, setCount] = useState(0)
    const [list, setList] = useState([])
    const [item, setItem] = useState()
    const [loading, setLoading] = useState(true)
    const [modal, setModal] = useState(modalInit)

    const [toRestore, setToRestore] = useState(false)
    const [modalRestore, setModalRestore] = useState(false)


    function handleLimit(event) {
        const value = event.target.value
        setLimit(value);
        actions.setLimit(value);
    }

    function handlePage(event, value) {
        setPage(value);
        actions.setPage(value);
    }

    const onHide = () => history.push(`/${route}`)

    const handleSearch = (e) => {
        const q = e.target.value
        setSearch(q)
        actions.list(q)
    }

    useEffect(() => {
        const _onChange = () => {
            setList(stores.getList())
            setLimit(stores.getLimit())
            setPage(stores.getPage())
            setCount(stores.getCount())
            setLoading(false)
        }

        function startValues() {
            stores.addChangeListener(_onChange);
            actions.list()
        }

        startValues();

        return function cleanup() {
            stores.removeChangeListener(_onChange);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const hasItem = (required) => required ? Boolean(item && id && (item.id?.toString() === id)) : true

    useEffect(() => {
        if (Boolean(Restore)) {
            setToRestore(restore)
            setModalRestore(Boolean(restore))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [restore])

    useEffect(() => {
        let modalTemp = modal
        for (const m of methods) {
            modalTemp[m.name] = method === m.route
        }
        setModal({ ...modalTemp })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [method])

    useEffect(() => {
        const _onChange = () => {
            setItem(stores.getItem())
        }

        function startValues() {
            stores.addChangeListener(_onChange)
            if (id) {
                actions.getById(id)
            } else {
                setItem(undefined)
            }
        }

        startValues();

        return function cleanup() {
            stores.removeChangeListener(_onChange)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    return (
        <PageHeader data={header}>

            {methods.map(method => (
                <div key={method.name}>
                    {hasItem(method.hasItem) /*&& permissions[route][method.route]*/ && <method.component
                        data={method.data}
                        onHide={onHide}
                        item={method.hasItem ? item : undefined}
                        show={modal[method.name]}
                    />}
                </div>
            ))}

            {
                Boolean(toRestore) && Boolean(Restore) && <Restore
                    onHide={() => setModalRestore(false)}
                    onHidePreview={onHide}
                    item={toRestore}
                    show={modalRestore}
                />
            }

            <Grid container>
                <Grid item xs={12} sm={8} md={6}>
                    {hasSearch &&
                        <Grid
                            container
                            direction="row"
                            justify="flex-start"
                            alignItems="center"
                        >
                            <InputSearch value={search} onChange={handleSearch} />
                        </Grid>
                    }
                </Grid>
                {permissions[route]['cadastrar'] && hasAdd &&
                    <Grid item xs={12} sm={4} md={6}>
                        <Grid
                            container
                            direction="row"
                            justify="flex-end"
                            alignItems="center"
                        >
                            <ButtonAtomic name={"Adicionar"} onClick={() => history.push(`/${route}/cadastrar`)} />
                        </Grid>
                    </Grid>
                }
            </Grid>
            {(hasSearch || hasAdd) && <Grid item xs style={{ height: 10 }} />}

            <Grid item xs>
                {loading ? <LoadingTable /> :
                    <>
                        <Hidden smDown>
                            <OrderedTable data={{ header: headerTable, items: formatData(list) }} labelEmpty={search.length > 0 ? 'Não há registros para a busca.' : undefined} />
                        </Hidden>
                        <Hidden mdUp>
                            <MobileList items={formatDataMobile(list)} />
                        </Hidden>
                        <Grid item xs style={{ height: 20 }} />
                        <Pagination lastPage={stores.getLastPage()} page={page} handlePage={handlePage} />
                        <LimitPagination
                            count={count}
                            handleLimit={handleLimit}
                            limit={limit}
                            offset={stores.getOffset()}
                            countLocal={list.length}
                        />
                    </>
                }
            </Grid>

        </PageHeader>
    );
}


export default Manage;