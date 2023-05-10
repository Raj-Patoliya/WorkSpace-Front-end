import React from "react";
import { Card } from "primereact/card";
import { Skeleton } from "primereact/skeleton";

const LoadingIssues = () => {
  return (
    <div className="row justify-content-start mt-2">
      <Card subTitle="TO DO" className="col-3 bg-light m-1 text-xs">
        <Skeleton width="100%" height="100px" className="mb-1"></Skeleton>
        <Skeleton width="100%" height="100px" className="mb-1"></Skeleton>
        <Skeleton width="100%" height="100px" className="mb-1"></Skeleton>
      </Card>
      <Card subTitle="TO DO" className="col-3 bg-light m-1 text-xs">
        <Skeleton width="100%" height="100px" className="mb-1"></Skeleton>
        <Skeleton width="100%" height="100px" className="mb-1"></Skeleton>
      </Card>
      <Card subTitle="TO DO" className="col-3 bg-light m-1 text-xs">
        <Skeleton width="100%" height="100px" className="mb-1"></Skeleton>
      </Card>
    </div>
  );
};

export default LoadingIssues;
